import React from 'react'
import { useHistory } from 'react-router-dom'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import IcUp from '@mui/icons-material/ArrowUpward'
import { AccessTooltipIcon } from '@control-ui/kit/Tooltip'
import { SxProps } from '@mui/material'

export interface ScrollUpButtonProps {
    scrollContainer: React.MutableRefObject<HTMLDivElement | null>
    bottom?: number
    right?: number
    resetHash?: boolean
    size?: 'small' | 'medium' | 'large'
    color?: IconButtonProps['color']
    /**
     * how many "lengths of the scrollContainer" need to be scrolled, before appearing,
     *
     * - `0.5` = half of the visible length
     * - `1` = below the visible length
     * - `2` = two times the visible length
     */
    pageScroll?: number
    zIndex?: number
    title?: string
    sx?: SxProps
}

export const ScrollUpButton: React.ComponentType<ScrollUpButtonProps> = (
    {
        scrollContainer,
        size, color,
        resetHash,
        bottom = 20, right = 20,
        pageScroll = 0.9,
        zIndex = 1000,
        sx,
        title = 'back to top',
    },
) => {
    const history = useHistory()
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

    return scrollContainer.current ?
        <AccessTooltipIcon title={title}>
            <IconButton
                tabIndex={-1}
                style={{
                    position: 'fixed', minWidth: 'auto',
                    bottom: bottom,
                    right: right,
                    zIndex: zIndex,
                    pointerEvents: scrolledPages > pageScroll ? 'all' : 'none',
                    opacity: scrolledPages > pageScroll ? 1 : 0,
                    transition: 'opacity 0.25s ease-in-out',
                }}
                size={size}
                color={color}
                sx={sx}
                onClick={() => {
                    if(resetHash && history.location.hash) {
                        history.push(history.location.pathname)
                    }
                    scrollContainer.current?.scrollTo(0, 0)
                }}
            >
                <IcUp fontSize={'small'}/>
            </IconButton>
        </AccessTooltipIcon> : null as unknown as React.ReactElement
}
