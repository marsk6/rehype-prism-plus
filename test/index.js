import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { visit } from 'unist-util-visit'
import { rehype } from 'rehype'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import dedent from 'dedent'
import rehypePrism from '../index.js'

/**
 * Mock meta in code block
 */
const addMeta = (metastring) => {
  if (!metastring) return
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'code') {
        node.data = { meta: metastring }
      }
    })
  }
}

const processHtml = (html, options, metastring) => {
  return rehype()
    .data('settings', { fragment: true })
    .use(addMeta, metastring)
    .use(rehypePrism, options)
    .processSync(html)
    .toString()
}

const processHtmlUnified = (html, options, metastring) => {
  return unified()
    .use(remarkParse)
    .use(remarkRehype, {})
    .use(addMeta, metastring)
    .use(rehypePrism, options)
    .use(rehypeStringify)
    .processSync(html)
    .toString()
}
test('display code block title', () => {
  const result = processHtml(
    dedent`
    <pre><code class="language-diff-css">
    .hello{
    - background:url('./urel.png');
    + background-image:url('./urel.png');
    }
    </code></pre>
  `,
    {},
    'title={.github/publish.yaml}'
  )
  assert.ok(result.includes(`<pre class="language-css">`))
  // assert.ok(result.includes(`<span class="code-line inserted">`))
  // assert.ok(result.includes(`<span class="code-line deleted">`))
  // assert.ok(result.includes(`<span class="code-line">`))
})

test.run()
