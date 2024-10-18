// @ts-nocheck
import { TsDocModuleFileSource } from '@control-ui/docs-ts/TsDocModule'
import { flattenRoutes } from '@control-ui/routes/flattenRoutes'
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as ts from 'typescript'
import { Node, SyntaxKind } from 'typescript'
import { DocRouteModule } from '../src/content/docs'
import { routes } from '../src/routes'

const basePathPackages = path.resolve(path.join(__dirname, '../../'))
const outputDir = path.resolve(path.join(__dirname, '..', 'public', 'docs'))

const verbose = false

function overwriteConsole() {
    const debug = console.debug
    console.debug = (...args: Parameters<Console['debug']>) => {
        if(!verbose) return
        debug(...args)
    }
}

overwriteConsole()

const startTime = Date.now()

const routing = routes(() => () => null)
const codeRoutes = flattenRoutes<DocRouteModule, TsDocModuleFileSource>(
    routing as DocRouteModule,
    (r) => typeof r.doc === 'string' && typeof r.docModule !== 'undefined',
    (r) => ({
        pagePath: r.path,
        ...r.docModule,
    } as TsDocModuleFileSource),
)

// const limit = 4
const limit = codeRoutes.length
console.log(`Found ${codeRoutes.length} code documentation pages, output limited to ${limit}.`)

const configFilePath = ts.findConfigFile(basePathPackages, ts.sys.fileExists, 'tsconfig.json')
console.debug(`Using configFile: ${configFilePath}`)
const configFile = ts.readConfigFile(configFilePath, ts.sys.readFile)
const parsedCommandLine = ts.parseJsonConfigFileContent(
    configFile.config, ts.sys, basePathPackages,
    {
        allowJs: true,
        forceConsistentCasingInFileNames: true,
        suppressImplicitAnyIndexErrors: true,
        suppressExcessPropertyErrors: true,
    },
    configFilePath,
)

const program = ts.createProgram({
    rootNames: [
        ...parsedCommandLine.fileNames,
    ],
    projectReferences: parsedCommandLine.projectReferences,
    //options: parsedCommandLine.options,
    options: {
        ...parsedCommandLine.options,
        removeComments: false,
        stripInternal: false,
    },
})

const codeRouteInfos: (TsDocModuleFileSource & { definitions: any[] })[] = []
for(const codeRoute of codeRoutes.slice(0, limit)) {
    console.debug(`Generating Page Bundle: ${codeRoute.pagePath}`)

    const modulePath = path.join(basePathPackages, codeRoute.modulePath)
    const codeRouteInfo = {
        ...codeRoute,
        definitions: [] as any[],
    }
    codeRouteInfos.push(codeRouteInfo)

    for(const filePath of codeRoute.files) {
        const absoluteFilePath = path.join(modulePath, filePath)
        console.debug(`Generating for: ${path.dirname(absoluteFilePath)}`)

        // const program = ts.createProgram(
        //     [absoluteFilePath, path.dirname(absoluteFilePath)],
        //     {allowJs: true, target: ts.ScriptTarget.ESNext, module: ts.ModuleKind.ESNext},
        // )
        // const sourceFile = program.getSourceFile(absoluteFilePath)

        // const resolved = ts.resolveModuleName(
        //     absoluteFilePath,
        //     basePathPackages,
        //     program.getCompilerOptions(),
        //     ts.sys,
        // )
        // const sourceFile = program.getSourceFile(resolved.resolvedModule?.resolvedFileName)
        const sourceFile = program.getSourceFile(absoluteFilePath)

        if(sourceFile) {
            const extractedDefinitions = extractModuleInfo(sourceFile, program)
            codeRouteInfo.definitions = codeRouteInfo.definitions.concat(extractedDefinitions)
        } else {
            throw new Error(`SourceFile not loaded: ${absoluteFilePath}`)
        }
    }
    // console.log('codeRouteInfo', JSON.stringify(codeRouteInfo, undefined, 4))
}

codeRouteInfos.forEach(codeRouteInfo => {
    const outputFile = path.join(outputDir, codeRouteInfo.package, codeRouteInfo.fromPath + '.json')
    console.debug(`Writing documentation bundle: ${outputFile}`)
    fs.writeFileSync(outputFile, JSON.stringify(codeRouteInfo))
})

console.log(`Written ${codeRouteInfos.length} documentation bundles in ${((Date.now() - startTime) / 1000).toFixed(2)}s to: ${outputDir}`)

// ---
// todo: split up cli from lib
// ---

function isJSDocText<TNode extends Node>(node: TNode): node is ts.JSDocText {
    return node.kind === SyntaxKind.JSDocText
}

function isJSDocLink<TNode extends Node>(node: TNode): node is ts.JSDocLink {
    return node.kind === SyntaxKind.JSDocLink
}

function isJSDocLinkCode<TNode extends Node>(node: TNode): node is ts.JSDocLinkCode {
    return node.kind === SyntaxKind.JSDocLinkCode
}

function isJSDocLinkPlain<TNode extends Node>(node: TNode): node is ts.JSDocLinkPlain {
    return node.kind === SyntaxKind.JSDocLinkPlain
}

function isNodeDirectlyExported(node: ts.Node): boolean {
    return (
        (ts.getCombinedModifierFlags(node as ts.Declaration) & ts.ModifierFlags.Export) !== 0
        // || (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile)
    )
}

function isNodeExported(node: ts.Node): boolean {
    let exported = isNodeDirectlyExported(node)
        || (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile)
    let parent = node.parent

    while(parent && !exported) {
        exported = isNodeDirectlyExported(parent)
        parent = parent.parent
    }

    return exported
}


/**
 * @see {@link https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API#using-the-type-checker} for a simplified example on which part of this code was built upon
 */
function extractModuleInfo(entrypointFile: ts.SourceFile, program: ts.Program) {
    let checker = program.getTypeChecker()
    // const moduleInfo: any = {
    //     kind: ts.SyntaxKind[entrypointFile.kind],
    //     filePath: path.relative(basePathPackages, entrypointFile.fileName).replaceAll('\\', '/'),
    //     children: [],
    // }
    const definitions: any[] = []

    const visitedFiles = new Set<string>()

    function serializeType(symbol: ts.Symbol, node: ts.Node) {
        let typeString: string = ''
        if(symbol.flags & ts.SymbolFlags.Class) {
            const classType = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!)

            const formatFlags =
                ts.TypeFormatFlags.NoTruncation
                | ts.TypeFormatFlags.MultilineObjectLiterals
                // | ts.TypeFormatFlags.NoTypeReduction
                | ts.TypeFormatFlags.UseSingleQuotesForStringLiteralType
                // | ts.TypeFormatFlags.UseTypeOfFunction
                | ts.TypeFormatFlags.UseStructuralFallback
                | ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope
                | ts.TypeFormatFlags.WriteClassExpressionAsTypeLiteral
                | ts.TypeFormatFlags.WriteArrowStyleSignature
                | ts.TypeFormatFlags.WriteTypeArgumentsOfSignature
                // | ts.TypeFormatFlags.InTypeAlias
                | ts.TypeFormatFlags.AllowUniqueESSymbolType

            let superclassString = ''
            const baseTypes = checker.getBaseTypes(classType)
            if(baseTypes.length > 0) {
                superclassString = ` extends ${baseTypes
                    .filter(base => base.getSymbol()?.flags & ts.SymbolFlags.Class)
                    .map(base => checker.typeToString(base, undefined, formatFlags))
                    .join(', ')}`
            }

            const implementedInterfaces = baseTypes.filter(base => base.getSymbol()?.flags & ts.SymbolFlags.Interface)
            let implementsString = ''
            if(implementedInterfaces.length > 0) {
                implementsString = ` implements ${implementedInterfaces.map(iface => checker.typeToString(iface, undefined, formatFlags)).join(', ')}`
            }

            // const constructorType = checker.getTypeOfSymbolAtLocation(
            //     symbol,
            //     symbol.valueDeclaration!,
            // )
            // const constructors = constructorType
            //     .getConstructSignatures()
            //     .map(serializeSignature)

            const members = classType.getProperties()//checker.getPropertiesOfType(classType)
            const memberStrings = members.map(member => {
                const memberType = checker.getTypeOfSymbolAtLocation(member, member.valueDeclaration!)
                const isOptional = member.flags & ts.SymbolFlags.Optional
                return `${member.name}${isOptional ? '?' : ''}: ${checker.typeToString(memberType, undefined, formatFlags)};`
            })

            // const methods = members.filter(member => member.flags & ts.SymbolFlags.Method)
            // const methodStrings = methods.map(method => {
            //     const methodType = checker.getTypeOfSymbolAtLocation(method, method.valueDeclaration!)
            //     const signature = checker.getSignaturesOfType(methodType, ts.SignatureKind.Call)
            //     const parameters = signature.map(sig => {
            //         return sig.getParameters().map(param => {
            //             // todo: generics, optional
            //             const paramType = checker.getTypeOfSymbolAtLocation(param, param.valueDeclaration!)
            //             return `${param.name}: ${checker.typeToString(paramType, undefined, formatFlags)}`
            //         }).join(', ')
            //     }).join(' | ') // for overloads
            //
            //     return `${method.name}(${parameters}): ${checker.typeToString((methodType as ts.Signature).getReturnType(), undefined, formatFlags)};`
            // })

            // typeString = `class ${symbol.name}${superclassString}${implementsString} {\n  ${memberStrings.join('\n  ')}\n}`
            typeString = `class ${symbol.name}${superclassString}${implementsString} { /* ... */}`
        } else if(symbol.valueDeclaration) {
            typeString = checker.typeToString(
                checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration),
                // undefined,
                node,
                ts.TypeFormatFlags.NoTruncation
                | ts.TypeFormatFlags.MultilineObjectLiterals
                // | ts.TypeFormatFlags.NoTypeReduction
                | ts.TypeFormatFlags.UseSingleQuotesForStringLiteralType
                // | ts.TypeFormatFlags.UseTypeOfFunction
                // | ts.TypeFormatFlags.UseStructuralFallback
                | ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope
                | ts.TypeFormatFlags.WriteClassExpressionAsTypeLiteral
                | ts.TypeFormatFlags.WriteArrowStyleSignature
                | ts.TypeFormatFlags.WriteTypeArgumentsOfSignature
                // | ts.TypeFormatFlags.InTypeAlias
                | ts.TypeFormatFlags.AllowUniqueESSymbolType,
            )
            typeString = formatTypeString(typeString)
        } else {
            // interface, type
            const declarations = symbol.getDeclarations()
            if(declarations) {
                // const declaredType = checker.getDeclaredTypeOfSymbol(symbol)
                // const formattedType = checker.typeToString(declaredType, undefined,
                //     ts.TypeFormatFlags.NoTruncation |
                //     ts.TypeFormatFlags.MultilineObjectLiterals |
                //     ts.TypeFormatFlags.NoTypeReduction |
                //     ts.TypeFormatFlags.UseSingleQuotesForStringLiteralType |
                //     ts.TypeFormatFlags.WriteClassExpressionAsTypeLiteral |
                //     ts.TypeFormatFlags.WriteArrowStyleSignature |
                //     ts.TypeFormatFlags.WriteTypeArgumentsOfSignature |
                //     ts.TypeFormatFlags.AllowUniqueESSymbolType,
                // )
                // console.log('formattedType', formattedType) // only prints symbol name

                declarations.forEach(decl => {
                    const type = checker.getTypeAtLocation(decl)
                    if(type.isClassOrInterface()) {
                        const properties = checker.getPropertiesOfType(type)
                        typeString = '{\n' + properties.map(prop => {
                            const propType = checker.getTypeOfSymbolAtLocation(prop, prop.valueDeclaration!)
                            const isOptional = prop.flags & ts.SymbolFlags.Optional
                            const propTypeString: string = checker.typeToString(
                                propType,
                                undefined,
                                ts.TypeFormatFlags.NoTruncation
                                | ts.TypeFormatFlags.MultilineObjectLiterals
                                | ts.TypeFormatFlags.UseSingleQuotesForStringLiteralType
                                | ts.TypeFormatFlags.WriteClassExpressionAsTypeLiteral
                                | ts.TypeFormatFlags.WriteArrowStyleSignature
                                //| ts.TypeFormatFlags.NoTypeReduction
                                | ts.TypeFormatFlags.WriteTypeArgumentsOfSignature
                                | ts.TypeFormatFlags.AllowUniqueESSymbolType,
                            )
                            return `    ${prop.name}${isOptional ? '?' : ''}: ${propTypeString}`
                        }).join('\n') + '\n}'
                    } else {
                        typeString = decl.getText(node?.getSourceFile())
                        if(typeString.startsWith('export ')) {
                            typeString = typeString.slice('export '.length)
                        }
                        const typeName = symbol.getName()
                        if(typeString.startsWith(`type ${typeName} =`)) {
                            typeString = typeString.slice(`type ${typeName} =`.length).trim()
                        } else if(typeString.startsWith(`type ${typeName}<`)) {
                            typeString = typeString.slice(`type ${typeName}`.length).trim()
                        }
                    }

                    // typeString += decl.getText(node?.getSourceFile()) // no control over formatting, `formatTypeString` may destroy existing formatting

                    // const type = checker.getTypeAtLocation(decl)
                    // typeString += checker.typeToString(type, node,
                    //     ts.TypeFormatFlags.NoTruncation
                    //     | ts.TypeFormatFlags.MultilineObjectLiterals
                    //     | ts.TypeFormatFlags.UseSingleQuotesForStringLiteralType
                    //     | ts.TypeFormatFlags.WriteClassExpressionAsTypeLiteral
                    //     | ts.TypeFormatFlags.WriteArrowStyleSignature
                    //     | ts.TypeFormatFlags.NoTypeReduction
                    //     | ts.TypeFormatFlags.WriteTypeArgumentsOfSignature
                    //     | ts.TypeFormatFlags.AllowUniqueESSymbolType,
                    // ) // only prints symbol name

                    // console.log(ts.SyntaxKind[decl.kind])  // Log the kind of declaration
                })
            } else {
                console.log(`No declarations found for symbol ${symbol.getName()}`)
            }
        }
        return typeString
    }

    /** Serialize a signature (call or construct) */
    function serializeSignature(signature: ts.Signature) {
        return {
            parameters: signature.parameters.map(serializeSymbol),
            returnType: checker.typeToString(signature.getReturnType()),
            documentation: ts.displayPartsToString(signature.getDocumentationComment(checker)),
        }
    }

    function serializeSymbol(symbol: ts.Symbol, node: ts.Node) {
        if(!symbol) return {}
        // let text2 = undefined
        // try {
        //     // text2 = node?.name?.getFullText(node?.getSourceFile())
        //     const declaredType = checker.getDeclaredTypeOfSymbol(symbol)
        //     text2 = checker.typeToString(declaredType, node, ts.TypeFormatFlags.NoTruncation)
        //     // text2 = checker.typeToTypeNode(
        //     //     checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!),
        //     //     // undefined,
        //     //     node,
        //     //     ts.NodeBuilderFlags.NoTruncation
        //     //     | ts.NodeBuilderFlags.InTypeAlias
        //     //     | ts.NodeBuilderFlags.MultilineObjectLiterals,
        //     //     // ts.TypeFormatFlags.NoTruncation
        //     //     // | ts.TypeFormatFlags.MultilineObjectLiterals
        //     //     // // | ts.TypeFormatFlags.NoTypeReduction
        //     //     // | ts.TypeFormatFlags.UseSingleQuotesForStringLiteralType
        //     //     // // | ts.TypeFormatFlags.UseTypeOfFunction
        //     //     // | ts.TypeFormatFlags.UseStructuralFallback
        //     //     // | ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope
        //     //     // | ts.TypeFormatFlags.WriteClassExpressionAsTypeLiteral
        //     //     // | ts.TypeFormatFlags.WriteArrowStyleSignature
        //     //     // | ts.TypeFormatFlags.WriteTypeArgumentsOfSignature
        //     //     // // | ts.TypeFormatFlags.InTypeAlias
        //     //     // | ts.TypeFormatFlags.AllowUniqueESSymbolType,
        //     // )?.getText(node?.getSourceFile())
        // } catch(e) {
        //     //
        // }

        // console.log('flags:', symbol.getFlags())
        // console.log('flags-t:', ts.SymbolFlags[symbol.getFlags()])
        if(symbol.flags & ts.SymbolFlags.Alias) {
            const aliasedSymbol = checker.getAliasedSymbol(symbol)
            console.log('aliased', checker.typeToString(checker.getTypeOfSymbolAtLocation(aliasedSymbol, node)))
        }

        const typeString = serializeType(symbol, node)
        // todo: even with `MultilineObjectLiterals` it doesn't generate line breaks,
        //       contains four spaces at various positions etc.,
        //       improve by using a custom printer or format with prettier?
        // const formattedTypeString = typeString
        // const formattedTypeString = formatTypeString(typeString)
        return {
            name: symbol.getName(),
            description: ts.displayPartsToString(symbol.getDocumentationComment(checker)),
            type: {
                text: typeString,
            },
        }
    }

    function formatTypeString(typeStr: string): string {
        return typeStr
            .replace(/\s+/g, ' ')  // Normalize spaces
            .replace(/{/g, '{\n  ') // Add newline after {
            .replace(/}/g, '\n}')   // Add newline before }
            .replace(/;/g, ';\n  ') // Add newlines after ;
            .replace(/\n\s*\n/g, '\n') // Remove extra newlines
    }

    function getJSDocComments(comment: ts.JSDoc['comment']) {
        // todo: maybe transform directly to Markdown instead of exposing as array?
        return typeof comment === 'string'
            ? [{kind: SyntaxKind[SyntaxKind.JSDocText], text: comment}]
            : Array.isArray(comment)
                ? comment
                    .map(c =>
                        isJSDocLink(c)
                            ? {
                                kind: SyntaxKind[c.kind],
                                text:
                                    (
                                        // note: protocol of HTTP links are inside the name
                                        ts.isIdentifier(c.name)
                                            ? c.name.text
                                            : ts.isQualifiedName(c.name)
                                                ? 'ref:' + c.name.getText() // todo?
                                                : ''
                                    ) + c.text,
                            } :
                            ({
                                kind: SyntaxKind[c.kind],
                                text: c.text,
                            }),
                    )
                    .filter(t => t.text)
                : undefined
    }

    function extractJsDoc(node: ts.Node): any {
        const symbol =
            (node as ts.NamedDeclaration).name ?
                checker.getSymbolAtLocation((node as ts.NamedDeclaration).name) : undefined

        if(!symbol) {
            console.log(`Missing Symbol ${SyntaxKind[node.kind]} ${(node as ts.NamedDeclaration).name?.getText(node.getSourceFile())} in ${node.getSourceFile().fileName}`)
        }

        const jsDocs = ts.getJSDocCommentsAndTags(node)
        if(jsDocs.length > 0) {
            // todo: merge all?
            // todo: jsDocs is typed `(ts.JSDoc | ts.JSDocTag)[]`, check how to handle completely
            const jsDoc = jsDocs.find(function(value): value is ts.JSDoc {
                return value.kind === SyntaxKind.JSDoc
            })
            // note: the Symbol documentation also includes JSDoc, even if specified at higher levels,
            //       meaning it merges JSDoc at FirstStatement and inside VariableDeclaration into one,
            //       thus if a symbol exists, plain JSDoc comments shouldn't be needed
            const comment = typeof jsDoc.comment === 'string' && symbol ? undefined : getJSDocComments(jsDoc.comment)
            const {flags, tags} = jsDoc.tags?.reduce((parsed, t) => {
                if(t.tagName.text === 'internal') {
                    parsed.flags.internal = true
                }
                if(t.kind === SyntaxKind.JSDocDeprecatedTag) {
                    parsed.flags.deprecated = true
                }
                if(
                    t.kind === SyntaxKind.JSDocSeeTag
                    || t.kind === SyntaxKind.JSDocAuthorTag
                    || t.kind === SyntaxKind.JSDocDeprecatedTag
                    || t.tagName.text === 'internal'
                    || t.tagName.text === 'todo'
                ) {
                    const tagName = t.tagName.text
                    if(!(tagName in parsed.tags)) {
                        parsed.tags[tagName] = []
                    }
                    parsed.tags[tagName].push(getJSDocComments(t.comment))
                    // parsed.tags[tagName].push({
                    //     tag: t.tagName.text,
                    //     comments: getJSDocComments(t.comment),
                    // })
                }
                return parsed
            }, {flags: {}, tags: {}}) || {}

            return {
                ...serializeSymbol(symbol, node),
                ...comment?.length ? {comment: comment} : {},
                ...flags || {},
                tags: tags,
            }
        }
        return {
            ...serializeSymbol(symbol, node),
        }
    }

    function extractCommon(
        node: ts.Node,
        sourceFile: ts.SourceFile,
        {includeParent}: { includeParent?: boolean } = {},
    ) {
        const name = (node as ts.NamedDeclaration).name?.getText(sourceFile)
        return {
            ...(name ? {name} : {}),
            kind: ts.SyntaxKind[node.kind],
            ...includeParent ? {parent: node.parent ? ts.SyntaxKind[node.parent.kind] : null} : {},
            loc: {
                filePath: path.relative(basePathPackages, sourceFile.fileName).replaceAll('\\', '/'),
                // note: line is 0-based
                start: sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile, true)),
                end: sourceFile.getLineAndCharacterOfPosition(node.getEnd()),
            },
            ...extractJsDoc(node),
        }
    }

    const visitInFile = (sourceFile: ts.SourceFile) => (node: ts.Node) => {
        if(ts.isClassDeclaration(node)) {
            definitions.push({
                exported: isNodeExported(node),
                ...extractCommon(node, sourceFile),
            })
        }

        if(ts.isFunctionDeclaration(node)) {
            definitions.push({
                exported: isNodeExported(node),
                ...extractCommon(node, sourceFile),
            })
        }

        if(ts.isVariableDeclaration(node)) {
            definitions.push({
                exported: isNodeExported(node),
                ...extractCommon(node, sourceFile),
                // initializer: node.initializer ? extractType(node.initializer) : undefined,
            })
        }

        if(ts.isInterfaceDeclaration(node)) {
            definitions.push({
                exported: isNodeExported(node),
                ...extractCommon(node, sourceFile),
            })
        }

        if(ts.isTypeAliasDeclaration(node)) {
            definitions.push({
                exported: isNodeExported(node),
                ...extractCommon(node, sourceFile),
            })
        }

        if(
            ts.isModuleDeclaration(node)
            || ts.isVariableDeclarationList(node)
            || node.kind === SyntaxKind.FirstStatement
        ) {
            ts.forEachChild(node, visitInFile(sourceFile))
        } else if(ts.isExportDeclaration(node)) {
            // namespace export, resolve and visit its children
            if(node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
                const moduleName = node.moduleSpecifier.text
                // const sourceFile = node.getSourceFile()

                const containingFile = sourceFile.fileName
                const compilerOptions = program.getCompilerOptions()

                // todo: is resolve only needed when NOT using `rootName` or something which is not included in the `tsconfig` includes?
                const resolvedModuleName = ts.resolveModuleName(
                    moduleName,
                    containingFile,
                    compilerOptions,
                    ts.sys,
                )

                if(resolvedModuleName.resolvedModule) {
                    const resolvedFileName = resolvedModuleName.resolvedModule.resolvedFileName

                    if(visitedFiles.has(resolvedFileName)) {
                        return
                    }

                    visitedFiles.add(resolvedFileName)

                    // console.log(`Resolved module: ${resolvedFileName}`)
                    const exportedSourceFile = program.getSourceFile(resolvedFileName)
                    if(exportedSourceFile) {
                        // todo: add file to bundle `files`
                        ts.forEachChild(exportedSourceFile, visitInFile(exportedSourceFile))
                    } else {
                        throw new Error(`SourceFile not available: ${resolvedFileName}`)
                    }
                } else {
                    throw new Error(`Export not resolved: ${moduleName}`)
                }
            }
        }
    }

    ts.forEachChild(entrypointFile, visitInFile(entrypointFile))

    // todo: implement referencing, to keep children which are not exported but referenced,
    //       most likely filtering must be moved after scanning all files included in any documentation page
    return definitions.filter(c => c.exported || c.referenced)
}

function extractType(node: ts.Node) {
    if(ts.isClassDeclaration(node)) {
        return {
            ...extractCommon(node, node.getSourceFile()),
        }
    }
    if(ts.isObjectLiteralExpression(node)) {
        return {
            ...extractCommon(node, node.getSourceFile()),
            properties: node.properties.map(p => extractType(p)),
        }
    }
    if(ts.isArrowFunction(node) || ts.isFunctionExpression(node)) {
        return {
            ...extractCommon(node, node.getSourceFile()),
            parameters: node.parameters.map(p => extractType(p)),
            returnType: node.type?.getText(),
        }
    }
    if(ts.isLiteralExpression(node)) {
        return {
            ...extractCommon(node, node.getSourceFile()),
        }
    }
    return null
}
