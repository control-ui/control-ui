import { makeIdFromText } from '@control-ui/docs/makeIdFromText'
import LinkIcon from '@mui/icons-material/Link'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { TypographyVariant, useTheme } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import React, { ReactNode } from 'react'

export interface LinkableHeadlineStateNode {
    id: string
    level: number
    children: string | React.ReactElement
}

export type LinkableHeadlineState = LinkableHeadlineStateNode[]

export type LinkableHeadlineContext = [LinkableHeadlineState, React.Dispatch<React.SetStateAction<LinkableHeadlineState>>]

// @ts-ignore
const HeadlinesContext = React.createContext<LinkableHeadlineContext>([])

export const useHeadlines = (): LinkableHeadlineContext => React.useContext(HeadlinesContext)

/**
 * Storage per page for all headlines, all headlines below should be rendered in the same render lifecycle
 */
export const HeadlinesProvider: React.ComponentType<React.PropsWithChildren<{}>> = ({children} = {}) => {
    const ctx = React.useState<LinkableHeadlineState>([])
    return <HeadlinesContext.Provider value={ctx}>
        {children}
    </HeadlinesContext.Provider>
}

const copyToClipboard = (str: string) => {
    const el = document.createElement('textarea')
    el.value = str
    document.body.appendChild(el)
    el.select()
    // eslint-disable-next-line deprecation/deprecation
    document.execCommand('copy')
    document.body.removeChild(el)
}

export interface LinkableHeadlineProps {
    level: number
    levelOffset?: number
    levelOffsetVariant?: number
    customId?: string
    replace?: RegExp
    mt?: number
    mb?: number
    style?: React.CSSProperties
    secondary?: ReactNode
}

export const LinkableHeadline: React.ComponentType<React.PropsWithChildren<LinkableHeadlineProps>> = (
    {
        level, levelOffset = 0, levelOffsetVariant = 0,
        customId = undefined,
        children,
        secondary,
        replace = /[,:!?&.\\/\s|]/g,
        mt, mb,
        style,
        ...p
    },
) => {
    const {spacing} = useTheme()
    const [, setHeadlines] = useHeadlines()
    const [hovering, setHovering] = React.useState(false)
    const id = customId ? customId :
        typeof children === 'string' ? makeIdFromText(children, replace) :
            children && children[0] && typeof children[0] === 'string' ?
                makeIdFromText(children[0], replace)
                : undefined

    React.useEffect(() => {
        if(id) {
            setHeadlines((headlines) => {
                const head = [...headlines]
                const hI = headlines.findIndex(h => h.id === id)
                // todo: autoincrement ID is the same already exists
                if(hI === -1) {
                    head.push({
                        level,
                        id: id,
                        // @ts-ignore
                        children: children,
                    })
                    return head
                }
                return headlines
            })
        }
        return () => {
            if(id) {
                setHeadlines((headlines) => {
                    const head = [...headlines]
                    const hI = headlines.findIndex(h => h.id === id)
                    if(hI !== -1) {
                        head.splice(hI, 1)
                        return head
                    }
                    return headlines
                })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, setHeadlines, level])

    return <Typography
        {...p} component={'h' + (level + levelOffset) as React.ElementType} variant={('h' + (level + levelOffsetVariant)) as TypographyVariant}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        id={id}
        style={{
            marginTop:
                typeof mt === 'number' ? spacing(mt) :
                    level === 1 ? 38 : 18 * (6 / level),
            marginBottom:
                typeof mb === 'number' ? spacing(mb) :
                    level === 1 ? 44 :
                        level < 5 ? 12 * (6 / level) :
                            16 * (6 / level),
            marginLeft: -24, paddingLeft: 24, position: 'relative',
            display: 'flex',
            ...(style || {}),
        }}
    >
        {id ?
            <Tooltip title={'Copy Link to Clipboard'}>
                <Button
                    component={'a'} color={'primary'} aria-hidden="true"
                    onFocus={() => setHovering(true)}
                    onBlur={() => setHovering(false)}
                    onClick={() => copyToClipboard(window.location.protocol + '//' + window.location.host + window.location.pathname + '#' + id)}
                    href={window.location.protocol + '//' + window.location.host + window.location.pathname + '#' + id}
                    style={{left: -6, top: '50%', minWidth: 'auto', transform: 'translateY(-50%)', position: 'absolute', border: 0, padding: 0, opacity: hovering ? 1 : 0.01}}
                >
                    <LinkIcon fontSize={'small'} style={{boxSizing: 'content-box', padding: 6, display: 'block'}}/>
                </Button>
            </Tooltip> : null}

        <Box sx={{flexGrow: 1}}>
            {children}
        </Box>

        {secondary ?
            <Box sx={{flexShrink: 0}}>
                {secondary}
            </Box> : null}
    </Typography>
}

