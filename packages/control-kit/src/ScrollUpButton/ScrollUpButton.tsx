import React from 'react'
import { IconButton } from '@mui/material'
import { ArrowUpward } from '@mui/icons-material'
import { AccessTooltipIcon } from '@control-ui/kit/Tooltip'

export const ScrollUpButton: React.ComponentType<{
    scrollContainer: React.MutableRefObject<HTMLDivElement | undefined>
}> = ({scrollContainer}) => {
    const [scrolledPages, setScrolledPage] = React.useState(0)

    const handleScroll = React.useCallback(() => {
        const scrollCurrent = scrollContainer.current
        if(!scrollCurrent) return
        // @ts-ignore
        const scrolledPgs = (scrollCurrent.scrollTop / scrollCurrent.clientHeight).toFixed(1) * 1
        if(scrolledPgs !== scrolledPages) {
            setScrolledPage(scrolledPgs)
        }
    }, [scrolledPages, scrollContainer])

    React.useEffect(() => {
        const scrollCurrent = scrollContainer.current
        if(!scrollCurrent) return
        scrollCurrent.addEventListener('scroll', handleScroll)
        return () => scrollCurrent.removeEventListener('scroll', handleScroll)
    }, [handleScroll, scrollContainer])

    return <IconButton
        tabIndex={-1}
        style={{
            position: 'fixed', minWidth: 'auto', bottom: 20, right: 20, zIndex: 1000,
            pointerEvents: scrolledPages > 0.9 ? 'all' : 'none',
            opacity: scrolledPages > 0.9 ? 1 : 0,
            transition: 'opacity 0.25s ease-in-out',
        }}
        onClick={() => scrollContainer.current?.scrollTo(0, 0)}
    >
        <AccessTooltipIcon title={'back to top'}>
            <ArrowUpward fontSize={'small'}/>
        </AccessTooltipIcon>
    </IconButton>
}
