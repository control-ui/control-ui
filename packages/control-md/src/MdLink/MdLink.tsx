import { getElementProps } from '@control-ui/md/getElementProps'
import React from 'react'
import Link, { LinkProps } from '@mui/material/Link'
import { LinkInternal } from '@control-ui/kit/Link'

export const MdLink: React.ComponentType<React.PropsWithChildren & React.ComponentPropsWithoutRef<'a'> & { currentDomain?: string, linkUnderline?: LinkProps['underline'] }> = (
    {
        currentDomain,
        href,
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
                {...getElementProps(p)}
            /> :
            <Link
                href={href}
                target="_blank" rel="noreferrer noopener"
                color={'primary'} underline={linkUnderline}
                {...getElementProps(p)}
            >
                {children}
            </Link>
    )
}
