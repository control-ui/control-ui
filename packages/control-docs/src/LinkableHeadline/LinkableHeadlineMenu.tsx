import React from 'react'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import Typography from '@mui/material/Typography'
import { LinkList, ListItemLink } from '@control-ui/kit/List/LinkList'
import { useHeadlines } from '@control-ui/docs/LinkableHeadline'
import { getUserCtrlKey, getUserPlatform } from '@control-ui/kit/Helper/getUserPlatform'

export interface LinkableHeadlineMenuProps {
    initial?: boolean
    disableNavLink?: boolean
    onClickKeepOpen?: boolean
    title?: string
    titleStyle?: React.CSSProperties
    linkListStyle?: React.CSSProperties
    linkItemStyle?: React.CSSProperties
    collapseStyle?: React.CSSProperties
    startIcon?: React.ReactElement
    disablePadding?: boolean
    dense?: boolean
    btnVariant?: 'text' | 'outlined' | 'contained'
    bindKey?: string
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
        collapseStyle = {},
        startIcon = undefined,
        disablePadding = false,
        dense = false,
        btnVariant,
        bindKey,
    },
) => {
    const btnRef = React.useRef<null | HTMLButtonElement>(null)
    const [open, setOpen] = React.useState(initial)
    const [headlines] = useHeadlines()

    React.useEffect(() => {
        if(typeof bindKey === 'undefined') return
        const onMenuOpen = (e: KeyboardEvent) => {
            if((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey && e.key.toLowerCase() === bindKey.toLowerCase()) {
                e.preventDefault()
                setOpen(o => {
                    const n = !o
                    if(n && btnRef.current) {
                        btnRef.current?.focus()
                    }
                    return n
                })
            }
        }
        document.addEventListener('keydown', onMenuOpen)
        return () => document.removeEventListener('keydown', onMenuOpen)
    }, [bindKey, setOpen, btnRef])

    const platform = getUserPlatform()

    return <LinkList label={title} style={linkListStyle} dense disablePadding={disablePadding}>
        <Button
            fullWidth
            onClick={() => setOpen(o => !o)}
            style={titleStyle}
            startIcon={startIcon}
            variant={btnVariant}
            ref={btnRef}
        >
            <span style={{marginRight: 'auto'}}>{open ? 'Hide' : 'Show'} {title}</span>
            {typeof bindKey === 'string' && platform?.indexOf('iP') !== 0 ?
                <Collapse in={!open} timeout="auto" unmountOnExit>
                    <Typography variant={'caption'} style={{position: 'relative', zIndex: 2, textTransform: 'none', padding: '0 4px', display: 'block'}} align={'right'}>
                        {getUserCtrlKey(platform)}
                        {' + '}
                        {bindKey.toUpperCase()}
                    </Typography>
                </Collapse> : null}
        </Button>
        <Collapse in={open} timeout="auto" unmountOnExit style={collapseStyle}>
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
