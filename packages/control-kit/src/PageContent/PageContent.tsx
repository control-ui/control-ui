import React from 'react'
import Typography from '@mui/material/Typography'
import Container, { ContainerProps } from '@mui/material/Container'
import Paper, { PaperProps } from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { SxProps } from '@mui/material/styles'

export interface PageTitleProps {
    title: string | React.ReactElement
    level?: number
    sx?: SxProps
    style?: React.CSSProperties
}

export const PageTitle: React.ComponentType<PageTitleProps> = (
    {
        title,
        level = 1,
        sx, style = {},
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
                ...style,
            }}
            sx={sx}
        >
            {title}
        </Typography>
    </Box>
}

export const PageContent: React.ComponentType<ContainerProps> = (
    {
        children,
        maxWidth = 'lg',
        style = {},
        ...p
    },
) => {
    const {spacing} = useTheme()
    return <Container fixed maxWidth={maxWidth} style={{paddingBottom: spacing(4), ...style}} {...p}>
        {children}
    </Container>
}

export interface PageBoxProps {
    title?: string
    titleLevel?: number
    sxPaper?: SxProps
    sxTitle?: SxProps
    sxBox?: SxProps
    mBox?: number
    pBox?: number
}

export const PageBox: React.ComponentType<React.PropsWithChildren<PageBoxProps>> = (
    {
        children, title = undefined, titleLevel = 1,
        sxTitle, sxPaper,
        pBox, sxBox, mBox = 2,
    },
) => {
    return <ContentPaper sx={sxPaper}>
        {title ? <PageTitle title={title} level={titleLevel} sx={sxTitle}/> : null}
        <Box m={mBox} p={pBox} sx={sxBox}>
            {children}
        </Box>
    </ContentPaper>
}

export const ContentPaper: React.ComponentType<React.PropsWithChildren<PaperProps>> = (
    {
        style = {},
        children,
        ...p
    }) => {
    const {spacing} = useTheme()
    return <Paper elevation={4} style={{overflow: 'auto', marginTop: spacing(4), ...style}} {...p}>
        {children}
    </Paper>
}

export interface ContainerPaper {
    fullHeight?: boolean
}

export const ContainerPaper: React.ComponentType<React.PropsWithChildren<PaperProps & ContainerPaper>> = (
    {
        children,
        fullHeight = true,
        style = {},
        ...p
    },
) => {
    const {spacing} = useTheme()
    return <Paper
        style={{
            padding: spacing(4),
            height: fullHeight ? '100%' : 'auto',
            overflow: fullHeight ? 'auto' : undefined,
            ...style,
        }}
        {...p}
    >
        {children}
    </Paper>
}
