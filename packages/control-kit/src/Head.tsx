import React from 'react'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'

export interface HeadProps {
    title: string
    description?: string
    twitterSite?: string
    twitterImage?: string
    ogType?: string
    ogImage?: string
    ogTtl?: number
}

export function Head(
    {title, description, twitterSite = '', twitterImage = '', ogType = 'website', ogImage = '', ogTtl = 604800}: HeadProps
): React.ReactElement {
    const history = useHistory()

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
                content={window.location.protocol + '//' + window.location.host + history.location.pathname +
                (history.location.hash ? history.location.hash : '')}
            />
            {description ? <meta property="og:description" content={description}/> : null}
            {ogImage ? <meta property="og:image" content={ogImage}/> : null}
            {ogTtl ? <meta property="og:ttl" content={ogTtl.toString()}/> : null}
        </Helmet>
    )
}
