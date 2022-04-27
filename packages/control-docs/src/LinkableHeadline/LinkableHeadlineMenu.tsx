import React from 'react'
import { Button, Collapse } from '@mui/material'
import { LinkList, ListItemLink } from '@control-ui/kit/List/LinkList'
import { useHeadlines } from '@control-ui/docs/LinkableHeadline'

export interface LinkableHeadlineMenuProps {
    initial?: boolean
    disableNavLink?: boolean
    onClickKeepOpen?: boolean
    title?: string
    linkListStyle?: React.CSSProperties
    titleStyle?: React.CSSProperties
    linkItemStyle?: React.CSSProperties
    startIcon?: React.ReactElement
    disablePadding?: boolean
    dense?: boolean
    btnVariant?: 'text' | 'outlined' | 'contained'
}

export const LinkableHeadlineMenu: React.ComponentType<LinkableHeadlineMenuProps> = (
    {
        initial = false,
        disableNavLink = false,
        onClickKeepOpen = false,
        title = 'Content Menu',
        linkListStyle = {},
        titleStyle = {},
        linkItemStyle = {},
        startIcon = undefined,
        disablePadding = false,
        dense = false,
        btnVariant,
    },
) => {
    const [open, setOpen] = React.useState(initial)
    const [headlines] = useHeadlines()

    return <LinkList label={title} style={linkListStyle} dense disablePadding={disablePadding}>
        <Button
            fullWidth
            onClick={() => setOpen(o => !o)}
            style={titleStyle}
            startIcon={startIcon}
            variant={btnVariant}
        >{open ? 'Hide' : 'Show'} {title}</Button>

        <Collapse in={open} timeout="auto" unmountOnExit>
            {headlines.map(headline => (
                <ListItemLink
                    key={headline.id} to={'#' + headline.id} dense={dense} exact
                    // @ts-ignore
                    primary={headline.children}
                    style={{...linkItemStyle, paddingLeft: 12 * headline.level}}
                    disableNavLink={disableNavLink}
                    onClick={() => {
                        if(onClickKeepOpen) return

                        setOpen(false)
                    }}
                />
            ))}
        </Collapse>
    </LinkList>
}
/**
 * @deprecated use `LinkableHeadlineMenu` instead
 */
export const HeadlineMenu: React.ComponentType<LinkableHeadlineMenuProps> = LinkableHeadlineMenu
