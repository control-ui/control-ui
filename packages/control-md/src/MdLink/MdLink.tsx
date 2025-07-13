import { LinkInternal } from '@control-ui/kit/Link'
import { getElementProps } from '@control-ui/md/getElementProps'
import IcOpenInNew from '@mui/icons-material/OpenInNew'
import Link, { LinkProps } from '@mui/material/Link'
import React from 'react'

export const MdLink: React.ComponentType<React.PropsWithChildren & React.ComponentPropsWithoutRef<'a'> & { currentDomain?: string, linkUnderline?: LinkProps['underline'], showOpenIn?: boolean }> = (
    {
        currentDomain,
        href,
        linkUnderline = 'hover',
        showOpenIn = true,
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

                {showOpenIn ?
                    <IcOpenInNew
                        fontSize={'inherit'}
                        sx={{
                            verticalAlign: 'text-top',
                            marginLeft: '0.25em',
                            display: 'inline-block',
                        }}
                    /> : null}
            </Link>
    )
}
