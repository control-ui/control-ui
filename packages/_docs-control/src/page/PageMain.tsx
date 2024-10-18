import React from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { PageBox, PageContent } from '@control-ui/kit/PageContent'
import { Markdown } from '../component/Markdown'
import NavProject from '../component/NavProject'
import { HeadMeta } from '@control-ui/kit/HeadMeta'
import { Logo } from '../asset/Logo'
import { LinkButton } from '@control-ui/kit/Link/LinkButton'
import { useTheme } from '@mui/material/styles'

const H = ({level, ...p}: TypographyProps & { level: 1 | 2 | 3 | 4 | 5 | 6 }) =>
    <Typography
        component={`h${level}`}
        variant={`h${level}`}
        gutterBottom
        style={{marginTop: 36 / (level / 2)}}
        {...p}
    />

const P = (p: TypographyProps) =>
    <Typography
        component={'p'}
        variant={'body1'}
        gutterBottom
        {...p}
    />

export default function PageMain() {
    const {palette} = useTheme()
    return (
        <>
            <HeadMeta
                title={'Control-UI'}
                description={'React Components for Web-Apps, with or without API, using the Material-UI Design-System.'}
            />
            <PageContent>
                <Box style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Logo width={150} style={{marginTop: 24, marginBottom: 8}}/>
                    <Typography
                        variant={'h1'}
                        style={{
                            color: palette.mode === 'dark' ? palette.primary.light : palette.primary.dark,
                            fontWeight: 'bold',
                        }}
                    >Control-UI</Typography>
                </Box>

                <PageBox>
                    <P>
                        <strong>React Components</strong> for Web-Apps, built with Material-UI.
                    </P>
                    <P>
                        Jump start your progressive web app with translation, layout, routing and a lot more.
                    </P>

                    <Box my={2}>
                        <Alert severity={'info'} variant={'outlined'} style={{borderRadius: 5}}>🚧 currently not intended for general usage / missing documentation / not following semver</Alert>
                    </Box>

                    <H level={2}>Control-UI: App</H>
                    <P>Layout Components and App starter for any PWA. Initializes provider for i18n, router, drawer and theme.</P>
                    <Markdown source={'~~npx create-react-app my-app --template control-ui-app~~'}/>
                    <LinkButton to={'/app/overview'} variant={'outlined'}>more</LinkButton>

                    <H level={2}>Control-UI: Docs</H>
                    <P>Components and providers for documentation apps.</P>
                    <Markdown source={'~~npx create-react-app my-docs --template control-ui-docs~~'}/>
                    <LinkButton to={'/docs/overview'} variant={'outlined'}>more</LinkButton>

                    <H level={2}>Control-UI: Docs Typescript</H>
                    <P>Components for rendering typescript code documentation.</P>
                    <LinkButton to={'/docs-ts/overview'} variant={'outlined'}>more</LinkButton>

                    <H level={2}>Control-UI: Kit</H>
                    <P>Material-UI Component Kit - for any web-app.</P>
                    <P>Loading, Content, Menus, Lists, Links, Settings, Tooltips, DataGrids and more.</P>
                    <LinkButton to={'/kit/overview'} variant={'outlined'}>more</LinkButton>

                    <H level={3}>Control-UI: Locales</H>
                    <P>Translations for control-ui apps, split by language and feature, made for `i18next`.</P>
                    <LinkButton to={'/locales/overview'} variant={'outlined'}>more</LinkButton>
                </PageBox>
                <PageBox>
                    <NavProject/>
                </PageBox>
            </PageContent>
        </>
    )
}
