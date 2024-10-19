import React from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'

export interface HeadMetaProps {
    title: string
    description?: string
    twitterSite?: string
    twitterImage?: string
    ogType?: string
    ogImage?: string
    ogTtl?: number
}

export function HeadMeta(
    {title, description, twitterSite = '', twitterImage = '', ogType = 'website', ogImage = '', ogTtl = 604800}: HeadMetaProps,
): React.ReactElement {
    const location = useLocation()

    return (
        <Helmet>
            <title>{title}</title>
            {description ? <meta name="description" content={description}/> : null}
            {/* Twitter */}
            <meta name="twitter:card" content="summary"/>
            {twitterSite ? <meta name="twitter:site" content={twitterSite}/> : null}
            <meta name="twitter:title" content={title}/>
            {description ? <meta name="twitter:description" content={description}/> : null}
            {twitterImage ? <meta name="twitter:image" content={twitterImage}/> : null}
            {/* Facebook */}
            {ogType ? <meta property="og:type" content={ogType}/> : null}
            <meta property="og:title" content={title}/>
            <meta
                property="og:url"
                content={window.location.protocol + '//' + window.location.host + location.pathname +
                    (location.hash ? location.hash : '')}
            />
            {description ? <meta property="og:description" content={description}/> : null}
            {ogImage ? <meta property="og:image" content={ogImage}/> : null}
            {ogTtl ? <meta property="og:ttl" content={ogTtl.toString()}/> : null}

            {/* todo: support language based meta */}
            {/*<meta name="docsearch:language" content={i18n.language}/>*/}
            {/*<meta name="docsearch:version" content="master"/>*/}
        </Helmet>
    )
}
