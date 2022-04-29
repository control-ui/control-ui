import React from 'react'
import Link from '@mui/material/Link'
import { LinkInternal } from '@control-ui/kit/Link/LinkInternal'
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types'

export const MdLink: React.ComponentType<React.ComponentPropsWithoutRef<'a'> & ReactMarkdownProps> = (
    {href, children, ...p},
) => {
    // todo: support "begins like current domain" to support react-routing for absolute paths in the same PWA
    return -1 === href?.indexOf('https://') && -1 === href?.indexOf('http://') ?
        <LinkInternal to={href} primary={children} color={'primary'} style={{fontWeight: 'bold'}} {...p}/> :
        <Link href={href} target="_blank" color={'primary'} style={{fontWeight: 'bold'}} rel="noreferrer noopener" {...p}>
            {children}
        </Link>
}
