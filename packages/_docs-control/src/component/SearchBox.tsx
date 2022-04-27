import React from 'react'
import { useSearch, useSearchHistory, useSearchIndex } from './SearchProvider'
import IcSearch from '@mui/icons-material/Search'
import IcClear from '@mui/icons-material/Clear'
import IcDelete from '@mui/icons-material/Delete'
import Dialog from '@mui/material/Dialog'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { filterRoutes, Route, useRouter } from '@control-ui/app'
import { DocRoute } from '@control-ui/docs'
import Paper from '@mui/material/Paper'
import FuseJs from 'fuse.js'
import Highlighter from 'react-highlight-words'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { Button } from '@mui/material'

export interface DocModuleRoute<C = any> extends DocRoute<C> {
    docModule?: { package: string, module: string, fromPath: string }
}


function flattenRoutes<R extends Route = Route, F = any>(
    route: R,
    filter: (route: R) => boolean,
    flatter: (route: R, parent: F | undefined, parentRoute: R | undefined) => F,
    parent?: F,
    parentRoute?: R,
    found: F[] = [],
): F[] {
    const flat = flatter(route, parent, parentRoute)
    if(filter(route)) {
        found.push(flat)
    }

    if(route.routes) {
        route.routes.forEach(r =>
            flattenRoutes<R>(r as R, filter, flatter, flat, route, found))
    }

    return found
}

const pid = {current: 0}

export const SearchBox: React.ComponentType = () => {
    const {open, setOpen} = useSearch()
    const [searchTerm, setSearchTerm] = React.useState('')
    const index = useSearchIndex()
    const {routes} = useRouter()
    const {history, addTerm, clearHistory} = useSearchHistory()

    const fuseRoutes = React.useMemo(() => {
        if(!routes.routes) return undefined
        const flatRoutes = flattenRoutes(
            routes,
            (r) => !r.routes,
            (r, parent) => ({
                route: r.nav?.to,
                label: r.nav?.label,
                parentLabel: parent && parent.label ? [...parent.parentLabel, parent.label] : [],
            }),
        )
        return new FuseJs(flatRoutes, {
            includeScore: true,
            includeMatches: true,
            threshold: 0.29,
            keys: ['label'],
        })
    }, [routes])

    const fuse = React.useMemo(() => {
        if(!index.index) return undefined
        return new FuseJs(index.index.modules, {
            includeScore: true,
            includeMatches: true,
            threshold: 0.29,
            keys: ['module'],
        })
    }, [index.index])

    const [matches, setMatches] = React.useState<undefined | {
        modules: any[]
        pages: any[]
        term: string
        matches: number
    }>(undefined)

    React.useEffect(() => {
        if(open) return
        setSearchTerm('')
    }, [setSearchTerm, open])
    React.useEffect(() => {
        const ppid = pid.current = pid.current + 1
        if(
            !index.index || !fuse || !fuseRoutes ||
            searchTerm.trim().length < 3
        ) {
            setMatches(undefined)
            return
        }
        const found = fuse.search<{ fromPath: string, package: string }>(searchTerm)
            .map(m => ({
                ...m.item,
                route:
                filterRoutes<DocModuleRoute>(routes as DocModuleRoute,
                    (route) => {
                        if(!route.docModule) return false
                        return route.docModule &&
                            route.docModule.package === m.item.package && route.docModule.fromPath === m.item.fromPath
                    })?.[0]?.nav?.to,
                score: m.score,
            }))
            .filter(m => m.route)

        const foundRoutes = fuseRoutes.search<{ fromPath: string, package: string }>(searchTerm)
            .map(m => ({
                ...m.item,
                score: m.score,
            }))

        if(ppid === pid.current) {
            setMatches({
                modules: found,
                pages: foundRoutes,
                term: searchTerm.trim(),
                matches: found.length + foundRoutes.length,
            })
        }
    }, [index, searchTerm, routes, fuse, fuseRoutes])

    return <Dialog
        open={open} onClose={() => setOpen(false)}
        maxWidth={'sm'} fullWidth
        PaperProps={{style: {background: 'transparent', overflow: 'visible'}, elevation: 0}}
        TransitionProps={{
            style: {
                alignItems: 'flex-start',
            },
        }}
    >
        <Paper style={{overflow: 'visible', flexShrink: 0, borderRadius: 5, marginTop: 6, display: 'flex', alignItems: 'center'}} elevation={0}>
            <TextField
                aria-label={'Search'}
                fullWidth
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                autoFocus
                InputProps={{
                    style: {borderRadius: 5},
                    startAdornment: (
                        <InputAdornment position="start">
                            <IcSearch/>
                        </InputAdornment>
                    ),
                }}
                onBlur={() => {
                    if(
                        matches?.term === searchTerm &&
                        matches?.matches > 0
                    ) {
                        addTerm(matches.term)
                    }
                }}
            />
            <Button
                style={{
                    marginRight: 'calc(-100% + 4px)',
                    minWidth: 16,
                    padding: 6,
                }}
                onClick={() => setOpen(false)}
                variant={'contained'}
            >
                <IcClear/>
            </Button>
        </Paper>

        <Box style={{display: 'flex'}}>
            {searchTerm.trim().length > 0 && searchTerm.trim().length < 3 ? <Typography variant={'caption'}>min. length: 3</Typography> : null}
            <Typography variant={'caption'} style={{marginLeft: 'auto'}}>open with: CMD + K</Typography>
        </Box>

        <Collapse
            in={Boolean(matches)} timeout="auto" unmountOnExit
            style={{overflow: 'auto', marginTop: 6}}
        >
            <Paper>
                <Box p={2}>
                    <Typography variant={'subtitle1'}>Pages</Typography>
                    <Typography variant={'caption'} gutterBottom>{matches?.pages.length} matches</Typography>
                    {matches?.pages.map((match, i) => <Box key={i} mb={1}>
                        <Link
                            to={match.route}
                            onClick={() => setOpen(false)}
                            style={{textDecoration: 'none'}}
                        >
                            <Paper variant={'outlined'} style={{borderRadius: 5}}>
                                <Box p={1}>
                                    <Typography>
                                        <Highlighter
                                            searchWords={matches?.term.split(' ')}
                                            textToHighlight={match.label}
                                            highlightTag={Highlight}
                                            autoEscape
                                        />
                                    </Typography>
                                    <Box style={{display: 'flex'}}>
                                        {match.parentLabel ? <Typography variant={'body2'}>{match.parentLabel.join(' > ')}</Typography> : null}
                                        <Typography variant={'caption'} style={{marginLeft: 'auto', opacity: 0.6}}>Score: {match.score.toFixed(2)}</Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Link>
                    </Box>)}

                    <Typography variant={'subtitle1'}>Module APIs</Typography>
                    <Typography variant={'caption'} gutterBottom>{matches?.modules.length} matches</Typography>
                    {matches?.modules.map((match, i) =>
                        <Box mb={1} key={i}>
                            <Link
                                to={match.route + '#doc-module--' + match.module}
                                onClick={() => {
                                    setOpen(false)
                                }}
                                style={{textDecoration: 'none'}}
                            >
                                <Paper variant={'outlined'} style={{borderRadius: 5}}>
                                    <Box p={1}>
                                        <Typography>
                                            <Highlighter
                                                searchWords={matches?.term.split(' ')}
                                                textToHighlight={match.module}
                                                autoEscape
                                                highlightTag={Highlight}
                                            />
                                        </Typography>
                                        <Box style={{display: 'flex'}}>
                                            <Typography variant={'body2'}>{match.package}</Typography>
                                            <Typography variant={'caption'} style={{marginLeft: 'auto', opacity: 0.6}}>Score: {match.score.toFixed(2)}</Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Link>
                        </Box>)}
                </Box>
            </Paper>
        </Collapse>

        <Collapse
            in={history.length > 0 && !matches} timeout="auto" unmountOnExit
            style={{overflow: 'auto', marginTop: 6}}
        >
            <Paper>
                <Box p={2}>
                    <Typography variant={'subtitle1'} gutterBottom style={{display: 'flex'}}>
                        History
                        <Tooltip title={'clear history'}>
                            <IconButton
                                size={'small'}
                                onClick={() => clearHistory()}
                                style={{marginLeft: 'auto'}}
                            ><IcDelete/></IconButton>
                        </Tooltip>
                    </Typography>
                    <List>
                        {[...history].reverse().map((h, i) =>
                            <ListItemButton key={i} onClick={() => setSearchTerm(h)}>
                                <ListItemText>{h}</ListItemText>
                            </ListItemButton>)}
                    </List>
                </Box>
            </Paper>
        </Collapse>
    </Dialog>
}

const Highlight: React.ComponentType<React.PropsWithChildren<{}>> = ({children}) => (
    <Typography component={'span'} color={'primary'} style={{fontWeight: 'bold'}}>{children}</Typography>
)
