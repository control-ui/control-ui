import React from 'react'
import IcSearch from '@mui/icons-material/Search'
import IcDelete from '@mui/icons-material/Delete'
import IcPage from '@mui/icons-material/Article'
import IcTag from '@mui/icons-material/Tag'
import Dialog from '@mui/material/Dialog'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import Paper from '@mui/material/Paper'
import FuseJs from 'fuse.js'
import Highlighter from 'react-highlight-words'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { Button, useMediaQuery } from '@mui/material'
import { useRouter } from '@control-ui/routes/RouterProvider'
import { useSearch, useSearchHistory } from '@control-ui/docs/DocsSearchProvider'
import { useDocsIndex } from '@control-ui/docs/DocsIndexProvider'
import { DocsIndexValueModules, DocsIndexValuePackages, DocsIndexValuePages, DocsIndexValuesCombiner } from '@control-ui/docs/createDocsIndex'
import { MatchMakerType, useSearchMatching } from '@control-ui/docs'
import { useTheme } from '@mui/material/styles'
import { useDrawer } from '@control-ui/app'

export type CustomDocsIndexModules = DocsIndexValuesCombiner<DocsIndexValueModules & DocsIndexValuePackages>
export type CustomDocsIndex = {
    modules: CustomDocsIndexModules
    pages: DocsIndexValuesCombiner<DocsIndexValuePages>
}

const pid = {current: 0}

const matchMaker: MatchMakerType<CustomDocsIndex> = {
    modules: {
        factory: (moduleIndex) => {
            const fuse = new FuseJs(moduleIndex.modules, {
                includeScore: true,
                includeMatches: true,
                threshold: 0.29,
                keys: [
                    'module',
                ],
            })
            return {
                search: (term) => fuse.search(term),
            }
        },
    },
    pages: {
        factory: (data) => {
            const fuse = new FuseJs(data.pages, {
                includeScore: true,
                includeMatches: true,
                threshold: 0.29,
                keys: [
                    'label',
                    'headings.headline',
                ],
            })
            return {
                search: (term) => fuse.search(term),
            }
        },
    },
}

export const SearchBox: React.ComponentType = () => {
    const {setOpen: setDrawerOpen} = useDrawer()
    const {open, setOpen} = useSearch()
    const {palette, breakpoints} = useTheme()
    const isMd = useMediaQuery(breakpoints.up('md'))
    const [searchTerm, setSearchTerm] = React.useState('')
    const searchRef = React.useRef<null | HTMLElement>(null)
    const {index} = useDocsIndex<CustomDocsIndex>()
    const {routes} = useRouter()
    const {history, addTerm, clearHistory, bindKey} = useSearchHistory()
    const searchFns = useSearchMatching<CustomDocsIndex>(index, matchMaker)

    React.useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey && e.key.toLowerCase() === bindKey?.toLowerCase()) {
                searchRef.current?.focus()
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [bindKey, searchRef])

    const [searchResult, setSearchResult] = React.useState<undefined | {
        matches: { [k: string]: any[] }
        term: string
        found: number
    }>(undefined)

    React.useEffect(() => {
        if(open) return
        setSearchTerm('')
    }, [setSearchTerm, open])

    React.useEffect(() => {
        const ppid = pid.current = pid.current + 1
        if(searchTerm.trim().length < 3) {
            setSearchResult(undefined)
            return
        }

        const result = searchFns.reduce((tmpResult, {matcher, id}) => {
            const matched =
                matcher.search(searchTerm)
                    .map(m => ({
                        ...m.item,
                        matchKeys: m.matches.map((m: { key: string, refIndex: number }) => ({
                            key: m.key,
                            index: m.refIndex,
                        })),
                        // matches: m.matches,
                        score: m.score,
                    }))
                    .filter(m => m.pagePath)
            return {
                matches: {
                    ...tmpResult.matches,
                    [id]: matched,
                },
                found: tmpResult.found + matched.length,
            }
        }, {matches: {}, found: 0} as {
            matches: { [k: string]: any[] }
            found: number
        })

        if(ppid === pid.current) {
            setSearchResult({
                ...result,
                term: searchTerm.trim(),
            })
        }
    }, [searchTerm, routes, searchFns])

    return <Dialog
        open={open} onClose={() => setOpen(false)}
        maxWidth={'sm'} fullWidth
        PaperProps={{
            style: {
                background: 'transparent', overflow: 'visible',
                margin: '26px 40px 32px 40px',
            },
            elevation: 0,
        }}
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
                inputRef={searchRef}
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
                        searchResult?.term === searchTerm &&
                        searchResult?.found > 0
                    ) {
                        addTerm(searchResult.term)
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
                <strong><small>ESC</small></strong>
            </Button>
        </Paper>

        {searchTerm.trim().length > 0 && searchTerm.trim().length < 3 ?
            <Box style={{display: 'flex'}}>
                <Typography variant={'caption'}>min. length: 3</Typography>
            </Box> : null}

        <Collapse
            in={Boolean(searchResult)} timeout="auto" unmountOnExit
            style={{overflow: 'auto', marginTop: 6}}
        >
            <Paper>
                <Box p={2}>
                    <Typography variant={'subtitle1'}>Pages</Typography>
                    <Typography variant={'caption'} gutterBottom>{searchResult?.matches.pages?.length} matches</Typography>
                    {searchResult?.matches.pages?.map((match, i) => <Box key={i} mb={1}>
                        <Link
                            to={match.pagePath}
                            onClick={() => {
                                setOpen(false)
                                if(!isMd) {
                                    setDrawerOpen(false)
                                }
                            }}
                            style={{textDecoration: 'none'}}
                        >
                            <Paper variant={'outlined'} style={{borderRadius: 5}}>
                                <Box p={1}>
                                    <Box style={{display: 'flex', alignItems: 'center'}}>
                                        <IcPage/>
                                        <Typography style={{marginLeft: 12}}>
                                            <Highlighter
                                                searchWords={searchResult?.term.split(' ')}
                                                textToHighlight={match.label}
                                                highlightTag={Highlight}
                                                autoEscape
                                            />
                                        </Typography>
                                    </Box>
                                    <Box style={{display: 'flex'}}>
                                        {match.parentLabel ? <Typography variant={'body2'}>{match.parentLabel.join(' > ')}</Typography> : null}
                                        <Typography variant={'caption'} style={{marginLeft: 'auto', opacity: 0.6}}>Score: {match.score.toFixed(2)}</Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Link>

                        {match.matchKeys?.filter((mk: any) => mk.key === 'headings.headline').map((mk: any) =>
                            // todo: the headlines should be sorted by their level, not scoring / not random
                            match.headings[mk.index].headline === match.label ? null :
                                <Box key={mk.index} py={1} style={{borderLeft: '1px solid ' + palette.divider}}>
                                    <Box key={mk.index} ml={1} py={1}>
                                        <Link
                                            to={match.pagePath + '#' + match.headings[mk.index].fragment}
                                            onClick={() => {
                                                setOpen(false)
                                                if(!isMd) {
                                                    setDrawerOpen(false)
                                                }
                                            }}
                                            style={{textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center'}}
                                        >
                                            <IcTag/>
                                            <Typography variant={'body2'} style={{marginLeft: 12}}>
                                                <Highlighter
                                                    searchWords={searchResult?.term.split(' ')}
                                                    textToHighlight={match.headings[mk.index].headline}
                                                    highlightTag={Highlight2}
                                                    autoEscape
                                                />
                                            </Typography>
                                        </Link>
                                    </Box>
                                </Box>)}
                    </Box>)}

                    <Typography variant={'subtitle1'}>Module APIs</Typography>
                    <Typography variant={'caption'} gutterBottom>{searchResult?.matches.modules?.length} matches</Typography>
                    {searchResult?.matches.modules?.map((match, i) =>
                        <Box mb={1} key={i}>
                            <Link
                                to={match.pagePath + '#doc-module--' + match.module}
                                onClick={() => {
                                    setOpen(false)
                                    if(!isMd) {
                                        setDrawerOpen(false)
                                    }
                                }}
                                style={{textDecoration: 'none'}}
                            >
                                <Paper variant={'outlined'} style={{borderRadius: 5}}>
                                    <Box p={1}>
                                        <Typography>
                                            <Highlighter
                                                searchWords={searchResult?.term.split(' ')}
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
            in={history.length > 0 && !searchResult} timeout="auto" unmountOnExit
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

const Highlight2: React.ComponentType<React.PropsWithChildren<{}>> = ({children}) => (
    <Typography component={'span'} color={'primary'} style={{fontWeight: 'bold'}} variant={'body2'}>{children}</Typography>
)
