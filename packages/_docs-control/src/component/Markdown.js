import React from 'react'
import {Markdown as CuiMarkdown} from '@control-ui/docs/Markdown/Markdown'
import {renderers} from '@control-ui/docs/Markdown/MarkdownRenderers'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import {LinkableHeadline} from '@control-ui/docs/LinkableHeadline'

const renderersContent = renderers(false)
renderersContent.h1 = renderersContent.h2 = renderersContent.h3 = renderersContent.h4 = renderersContent.h5 = LinkableHeadline

const rehypePlugins = [rehypeRaw]
const remarkPlugins = [remarkGfm]

export const Markdown = ({source}) => {
    return source ?
        <CuiMarkdown
            source={source}
            rehypePlugins={rehypePlugins}
            remarkPlugins={remarkPlugins}
            components={renderersContent}
        /> : null
}
