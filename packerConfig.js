const path = require('path')
const {packer} = require('lerna-packer')
const {babelTargetsLegacyEsmFirst} = require('lerna-packer/packer/babelEsModules.js')
const {makeModulePackageJson, copyRootPackageJson, transformerForLegacyEsmFirst} = require('lerna-packer/packer/modulePackages.js')

packer({
    apps: {
        docs: {
            root: path.resolve(__dirname, 'packages', '_docs-control'),
            template: path.resolve(__dirname, 'packages', '_docs-control/public/index.html'),
            contentBase: path.resolve(__dirname, 'packages', '_docs-control/public'),// dev-server
            port: 9219,
            main: path.resolve(__dirname, 'packages', '_docs-control/src/index.tsx'),
            dist: path.resolve(__dirname, 'dist', 'docs-control'),
            devServer: {
                client: {
                    overlay: false,
                    progress: false,
                },
            },
            publicPath: '/',
            aliasPackagesBuild: 'production',
            noParse: [
                require.resolve('typescript/lib/typescript.js'),
                path.resolve('packages/_docs-control/node_modules/typescript/lib/typescript.js'),
            ],
        },
    },
    packages: {
        // the keys are the commonjs names that is applied to externals
        // this is the same as `@babel/plugin-transform-modules-commonjs` applies
        controlApp: {
            name: '@control-ui/app',
            root: path.resolve(__dirname, 'packages', 'control-app'),
            entry: path.resolve(__dirname, 'packages', 'control-app/src/'),
            babelTargets: babelTargetsLegacyEsmFirst,
            doServeWatch: false,
        },
        controlDocs: {
            name: '@control-ui/docs',
            root: path.resolve(__dirname, 'packages', 'control-docs'),
            entry: path.resolve(__dirname, 'packages', 'control-docs/src/'),
            babelTargets: babelTargetsLegacyEsmFirst,
            doServeWatch: false,
        },
        controlDocsTs: {
            name: '@control-ui/docs-ts',
            root: path.resolve(__dirname, 'packages', 'control-docs-ts'),
            entry: path.resolve(__dirname, 'packages', 'control-docs-ts/src/'),
            babelTargets: babelTargetsLegacyEsmFirst,
            doServeWatch: false,
        },
        controlKit: {
            name: '@control-ui/kit',
            root: path.resolve(__dirname, 'packages', 'control-kit'),
            entry: path.resolve(__dirname, 'packages', 'control-kit/src/'),
            babelTargets: babelTargetsLegacyEsmFirst,
            doServeWatch: false,
        },
        controlRoutes: {
            name: '@control-ui/routes',
            root: path.resolve(__dirname, 'packages', 'control-routes'),
            entry: path.resolve(__dirname, 'packages', 'control-routes/src/'),
            babelTargets: babelTargetsLegacyEsmFirst,
            doServeWatch: false,
        },
        controlMdMui: {
            name: '@control-ui/md',
            root: path.resolve(__dirname, 'packages', 'control-md'),
            entry: path.resolve(__dirname, 'packages', 'control-md/src/'),
            babelTargets: babelTargetsLegacyEsmFirst,
            doServeWatch: false,
        },
    },
}, __dirname, {
    afterEsModules: (packages, pathBuild) => {
        return Promise.all([
            makeModulePackageJson(transformerForLegacyEsmFirst)(packages, pathBuild),
            copyRootPackageJson()(packages, pathBuild),
        ])
    },
})
    .then(([execs, elapsed]) => {
        if(execs.indexOf('doServe') !== -1) {
            console.log('[packer] is now serving (after ' + elapsed + 'ms)')
        } else {
            console.log('[packer] finished successfully (after ' + elapsed + 'ms)', execs)
            process.exit(0)
        }
    })
    .catch((e) => {
        console.error('[packer] finished with error(s)', e)
        process.exit(1)
    })

