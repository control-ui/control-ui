import React from 'react'
import ReactMarkdown from 'react-markdown'
import { renderers } from '@control-ui/md/MarkdownRenderers'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { LinkableHeadline } from '@control-ui/docs/LinkableHeadline'
import { MdLink } from '@control-ui/md'

const renderersContent = renderers(false)
// @ts-ignore
renderersContent.h1 = renderersContent.h2 = renderersContent.h3 = renderersContent.h4 = renderersContent.h5 = p => <LinkableHeadline level={Number(p.node?.tagName.slice(1))} levelOffset={0}>{p.children}</LinkableHeadline>
// @ts-ignore
renderersContent.a = p => <MdLink {...p} currentDomain={window.location.protocol + '//' + window.location.host}/>

const renderersContentDense = renderers(true)
// @ts-ignore
renderersContentDense.h1 = renderersContentDense.h2 = renderersContentDense.h3 = renderersContentDense.h4 = renderersContentDense.h5 = p => <LinkableHeadline {...p} levelOffset={1} levelOffsetVariant={2}/>
// @ts-ignore
renderersContentDense.a = p => <MdLink {...p} currentDomain={window.location.protocol + '//' + window.location.host}/>

const rehypePlugins = [rehypeRaw]
const remarkPlugins = [remarkGfm]

export const MarkdownBase: React.ComponentType<{ source?: string, dense?: boolean }> = ({source, dense}) => {
    return source ?
        <ReactMarkdown
            rehypePlugins={rehypePlugins}
            remarkPlugins={remarkPlugins}
            components={dense ? renderersContentDense : renderersContent}
        >{source}</ReactMarkdown> :
        null
}

export const Markdown: React.ComponentType<{ source?: string, dense?: boolean }> = React.memo(MarkdownBase)
