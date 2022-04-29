import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { MdInlineCode } from '@control-ui/md-mui/MdInlineCode'
import { LinkableHeadline } from '@control-ui/docs/LinkableHeadline'
import { DocModule } from './DocGenModule'
import { Alert, Link } from '@mui/material'
import { DocsDetailsModule } from './DocsDetailsModule'

export const DocsDetailsModules: React.ComponentType<{ modules: DocModule | undefined }> = ({modules}) => {
    const repoRoot = 'https://github.com/control-ui/control-ui/tree/main/packages/'
    return <>
        <LinkableHeadline level={1} customId={'module-apis'} mb={4} mt={0}>
            Module APIs
        </LinkableHeadline>
        <Box mb={4}>
            <Alert severity={'warning'} variant={'outlined'}>
                <Typography gutterBottom variant={'body2'}>Experimental documentation generator, there may be missing or bad-UX parts in the generated code documentation.</Typography>
                <Typography variant={'body2'}>Additionally, not all source code is converted to full-Typescript yet, for the pure-JS parts nothing can be generated.</Typography>
            </Alert>
        </Box>

        {modules ?
            <>
                <Box mb={4}>
                    <Typography variant={'body2'} gutterBottom>
                        {'Package: '}
                        <Link
                            href={'https://www.npmjs.com/package/' + modules.package}
                            target={'_blank'} rel={'noreferrer'}
                        >
                            {modules.package}
                        </Link>
                    </Typography>
                    {/*<Typography variant={'body2'} gutterBottom>Rel Path: <MdInlineCode>{modules.relPath}</MdInlineCode></Typography>
            <Typography variant={'body2'} gutterBottom>From Path: <MdInlineCode>{modules.fromPath}</MdInlineCode></Typography>*/}
                    <Typography variant={'body2'} gutterBottom><MdInlineCode>@import * from {modules.package}/{modules.fromPath}</MdInlineCode></Typography>
                    <Typography variant={'body2'} gutterBottom component={'div'}>
                        Files:
                        <ul style={{marginTop: 3, marginBottom: 0}}>
                            {modules.files.map((f, i) =>
                                <li key={i} style={{marginBottom: i < (modules.files?.length || 0) - 1 ? 3 : 0}}>
                                    <Link
                                        href={repoRoot + modules.relPath + f}
                                        target={'_blank'} rel={'noreferrer'}
                                    >
                                        {f}
                                    </Link>
                                </li>,
                            )}
                        </ul>
                    </Typography>
                </Box>
                {Object.keys(modules.docs).map(module => <DocsDetailsModule repoRoot={repoRoot} module={modules.docs[module]} id={module} key={module}/>)}
            </> : null}
    </>
}
