import React from 'react'
import {Link} from '@control-ui/kit/Link'
import {findScrollParent} from '@control-ui/kit/Helper/findScrollParent'

export const LinkInternal = ({prefixRelative = '', to, primary, ...p}) => {
    return <Link
        to={
            0 === to.indexOf('#') ?
                window.location.pathname + to :
                prefixRelative + to
        }
        primary={primary} color={'primary'} style={{fontWeight: 'bold'}}
        onClick={
            0 === to.indexOf('#') ?
                () => {
                    let nextPos = document.querySelector(to)
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
