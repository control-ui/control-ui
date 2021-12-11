import React from 'react'
import {Button, Collapse, Typography} from '@material-ui/core'
import {AccessTooltipIcon} from '@control-ui/kit/Tooltip'
import {Link as LinkIcon} from '@material-ui/icons'
import {LinkList, ListItemLink} from '@control-ui/kit/List/LinkList'

const HeadlinesContext = React.createContext({})

export const useHeadlines = () => React.useContext(HeadlinesContext)

export const HeadlinesProvider = ({children} = {}) => {
    const [headlines, setHeadlines] = React.useState({})

    return <HeadlinesContext.Provider value={{headlines, setHeadlines}}>
        {children}
    </HeadlinesContext.Provider>
}

const copyToClipboard = str => {
    const el = document.createElement('textarea')
    el.value = str
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
}

export const LinkableHeadline = ({level, children, replace = /[,:!?&.\\/\s|]/g, ...p}) => {
    const {setHeadlines} = useHeadlines()
    const [hovering, setHovering] = React.useState(false)
    const id = children && children[0] && typeof children[0] === 'string' ?
        children[0]
            .replace(/^\d/, '')
            .replace(replace, '-')
            .replace(/--/g, '-')
            .replace(/^--/, '')
            .toLowerCase()
            .substr(0)
        : undefined

    React.useEffect(() => {
        if(id) {
            setHeadlines((headlines) => {
                const head = {...headlines}
                if(!head[id]) {
                    head[id] = {
                        level,
                        children: children[0],
                    }
                    return head
                }
                return headlines
            })
        }
        return () => {
            if(id) {
                setHeadlines((headlines) => {
                    const head = {...headlines}
                    if(head[id]) {
                        delete head[id]
                        return head
                    }
                    return headlines
                })
            }
        }
    }, [id, setHeadlines, children, level])

    return <Typography
        {...p} component={'h' + (level + 1)} variant={'h' + (level)}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        id={id}
        style={{
            marginTop: level === 1 ? 38 : 18 * (6 / level),
            marginBottom: level === 1 ? 44 :
                level < 5 ? 12 * (6 / level) :
                    16 * (6 / level),
            marginLeft: -24, paddingLeft: 24, position: 'relative',
        }}
    >
        {id ? <Button
            component={'a'} color={'primary'} aria-hidden="true"
            onFocus={() => setHovering(true)}
            onBlur={() => setHovering(false)}
            onClick={() => copyToClipboard(window.location.protocol + '//' + window.location.host + window.location.pathname + '#' + id)}
            href={window.location.protocol + '//' + window.location.host + window.location.pathname + '#' + id}
            style={{left: -6, top: '50%', minWidth: 'auto', transform: 'translateY(-50%)', position: 'absolute', border: 0, padding: 0, opacity: hovering ? 1 : 0.01}}
        ><AccessTooltipIcon title={'Copy Link to Clipboard'}>
            <LinkIcon fontSize={'small'} style={{boxSizing: 'content-box', padding: 6, display: 'block'}}/>
        </AccessTooltipIcon></Button> : null}
        {children}
    </Typography>
}

export const HeadlineMenu = (
    {
        initial = false,
        disableNavLink = false,
        onClickKeepOpen = false,
        title = 'Content Menu',
        linkListStyle = {},
        titleStyle = {},
        linkItemStyle = {},
        startIcon = undefined,
    },
) => {
    const [open, setOpen] = React.useState(initial)
    const {headlines} = useHeadlines()

    return <LinkList label={title} style={linkListStyle}>
        <Button
            fullWidth
            onClick={() => setOpen(o => !o)}
            style={titleStyle}
            startIcon={startIcon}
        >{open ? 'Hide' : 'Show'} {title}</Button>

        <Collapse in={open} timeout="auto" unmountOnExit>
            {Object.keys(headlines).map(id => (
                <ListItemLink
                    key={id} to={'#' + id} dense exact
                    primary={headlines[id].children}
                    style={{...linkItemStyle, paddingLeft: 12 * headlines[id].level}}
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
