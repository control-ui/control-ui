import React from 'react'
import ReactMarkdown from 'react-markdown'

export const Markdown = (
    {
        source,
        rehypePlugins = [],
        remarkPlugins = [],
        skipHtml = false,
        components,
    },
) =>
    <ReactMarkdown
        children={source}
        skipHtml={skipHtml}
        rehypePlugins={rehypePlugins}
        remarkPlugins={remarkPlugins}
        components={components}
    />
