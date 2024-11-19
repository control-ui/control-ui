import React from 'react'
import Link, { LinkProps } from '@mui/material/Link'
import { LinkInternal } from '@control-ui/kit/Link'
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types'

export const MdLink: React.ComponentType<React.PropsWithChildren & React.ComponentPropsWithoutRef<'a'> & ReactMarkdownProps & { currentDomain?: string, linkUnderline?: LinkProps['underline'] }> = (
    {
        currentDomain,
        href,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        node,
        linkUnderline = 'hover',
        children, ...p
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
                underline={linkUnderline}
                {...p}
            /> :
            <Link
                href={href}
                target="_blank" rel="noreferrer noopener"
                color={'primary'} underline={linkUnderline}
                {...p}
            >
                {children}
            </Link>
    )
}
