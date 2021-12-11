import React from 'react'
import Typography from '@material-ui/core/Typography'
import Container, { ContainerProps } from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import useTheme from '@material-ui/core/styles/useTheme'
import Box from '@material-ui/core/Box'

export interface PageTitleProps {
    title: string | React.ReactElement
    level?: number
}

export const PageTitle: React.ComponentType<PageTitleProps> = (
    {
        title,
        level = 1,
    },
) => {
    const theme = useTheme()
    return <Box m={2}>
        <Typography
            component={'h' + level}
            // @ts-ignore
            variant={'h' + level}
            style={{
                flexShrink: 0,
                marginTop: theme.spacing(3),
                marginBottom: theme.spacing(3),
            }}>
            {title}
        </Typography>
    </Box>
}

export const PageContent: React.ComponentType<ContainerProps> = (
    {
        children,
        maxWidth = 'lg',
    },
) => {
    const {spacing} = useTheme()
    return <Container fixed maxWidth={maxWidth} style={{paddingBottom: spacing(4)}}>
        {children}
    </Container>
}

export interface PageBoxProps {
    title?: string
    titleLevel?: number
}

export const PageBox = ({children, title = undefined, titleLevel = 1}: React.PropsWithChildren<PageBoxProps>): React.ReactElement => {
    return <ContentPaper>
        {title ? <PageTitle title={title} level={titleLevel}/> : null}
        <Box m={2}>
            {children}
        </Box>
    </ContentPaper>
}

export const ContentPaper = ({children}: React.PropsWithChildren<{}>): React.ReactElement => {
    const {spacing} = useTheme()
    return <Paper elevation={4} style={{overflow: 'auto', marginTop: spacing(4)}}>
        {children}
    </Paper>
}

export interface ContainerPaper {
    fullHeight?: boolean
    style?: React.CSSProperties
}

export const ContainerPaper = ({children, fullHeight = true, style = {}}: React.PropsWithChildren<ContainerPaper>): React.ReactElement => {
    const {spacing} = useTheme()
    return <Paper style={{
        padding: spacing(4),
        height: fullHeight ? '100%' : 'auto',
        overflow: fullHeight ? 'auto' : undefined,
        ...style,
    }}>
        {children}
    </Paper>
}
