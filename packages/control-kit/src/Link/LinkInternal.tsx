import React from 'react'
import { Link, LinkProps } from '@control-ui/kit/Link'
import { findScrollParent } from '@control-ui/kit/Helper'

export type LinkInternalProps = LinkProps

export const LinkInternal = ({to, primary, ...p}: LinkInternalProps) => {
    return <Link
        to={to}
        primary={primary} color={'primary'}
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
