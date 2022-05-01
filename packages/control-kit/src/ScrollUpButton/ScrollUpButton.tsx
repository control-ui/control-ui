import React from 'react'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import IcUp from '@mui/icons-material/ArrowUpward'
import { AccessTooltipIcon } from '@control-ui/kit/Tooltip'

export const ScrollUpButton: React.ComponentType<{
    scrollContainer: React.MutableRefObject<HTMLDivElement | null>
    bottom?: number
    right?: number
    size?: 'small' | 'medium' | 'large'
    color?: IconButtonProps['color']
}> = (
    {
        scrollContainer,
        size,
        bottom = 20, right = 20,
        color,
    },
) => {
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
        <AccessTooltipIcon title={'back to top'}>
            <IconButton
                tabIndex={-1}
                style={{
                    position: 'fixed', minWidth: 'auto',
                    bottom: bottom,
                    right: right,
                    zIndex: 1000,
                    pointerEvents: scrolledPages > 0.9 ? 'all' : 'none',
                    opacity: scrolledPages > 0.9 ? 1 : 0,
                    transition: 'opacity 0.25s ease-in-out',
                }}
                size={size}
                color={color}
                onClick={() => scrollContainer.current?.scrollTo(0, 0)}
            >
                <IcUp fontSize={'small'}/>
            </IconButton>
        </AccessTooltipIcon> : null as unknown as React.ReactElement
}
