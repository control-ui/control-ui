import React from 'react'
import { Link, LinkProps } from '@control-ui/kit/Link'
import { findScrollParent } from '@control-ui/kit/Helper/findScrollParent'

export interface LinkInternalProps extends LinkProps {
    prefixRelative?: string
}

export const LinkInternal = ({prefixRelative = '', to, primary, ...p}: LinkInternalProps) => {
    return <Link
        to={
            0 === to?.indexOf('#') ?
                window.location.pathname + to :
                prefixRelative + to
        }
        primary={primary} color={'primary'} style={{fontWeight: 'bold'}}
        onClick={
            0 === to?.indexOf('#') ?
                () => {
                    const nextPos = document.querySelector(to) as HTMLElement
                    if(nextPos) {
                        const scrollElem = findScrollParent(nextPos)
                        if(scrollElem) {
                            scrollElem.scrollTop = nextPos.offsetTop - 56
                        }
                    }
                } :
                undefined
        }
        {...p}
    />
}
