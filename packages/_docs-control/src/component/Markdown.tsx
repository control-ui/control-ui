import React from 'react'
import CuiMarkdown from 'react-markdown'
import { renderers } from '@control-ui/md-mui/MarkdownRenderers'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { LinkableHeadline } from '@control-ui/docs/LinkableHeadline'

const renderersContent = renderers(false)
// @ts-ignore
renderersContent.h1 = renderersContent.h2 = renderersContent.h3 = renderersContent.h4 = renderersContent.h5 = p => <LinkableHeadline {...p} levelOffset={1}/>

const rehypePlugins = [rehypeRaw]
const remarkPlugins = [remarkGfm]

export const Markdown: React.ComponentType<{ source?: string }> = ({source}) =>
    source ?
        <CuiMarkdown
            rehypePlugins={rehypePlugins}
            remarkPlugins={remarkPlugins}
            components={renderersContent}
        >{source}</CuiMarkdown> :
        null

