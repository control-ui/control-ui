import React from 'react'
import Link from '@mui/material/Link'
import { LinkInternal } from '@control-ui/kit/Link/LinkInternal'
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types'

export const MdLink: React.ComponentType<React.ComponentPropsWithoutRef<'a'> & ReactMarkdownProps & { currentDomain?: string }> = (
    {
        currentDomain,
        style = {},
        href, children, ...p
    },
) => {
    const isRel = (-1 === href?.indexOf('https://') && -1 === href?.indexOf('http://'))
    const isDomain = (typeof currentDomain === 'string' && href?.startsWith(currentDomain))
    return (
        isRel || isDomain ?
            <LinkInternal
                to={isDomain ? href?.slice(currentDomain.length) : href}
                primary={children}
                color={'primary'}
                style={{fontWeight: 'bold', ...style}}
                {...p}
            /> :
            <Link href={href} target="_blank" color={'primary'} style={{fontWeight: 'bold', ...style}} rel="noreferrer noopener" {...p}>
                {children}
            </Link>
    )
}
