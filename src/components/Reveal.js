import React, { useEffect } from 'react'

import '../lib/reveal/css/reset.css'
import '../lib/reveal/css/reveal.css'
import '../lib/reveal/css/theme/sky.css'

export default function Reveal({ backgroundElement, children }) {
  useEffect(() => {
    import('../lib/reveal/js/reveal.js').then(module => {
      const _Reveal = module.default
      _Reveal.initialize({
        dependencies: [
          { src: 'plugin/markdown/marked.js' },
          { src: 'plugin/markdown/markdown.js' },
          { src: 'plugin/notes/notes.js', async: true },
          { src: 'plugin/highlight/highlight.js', async: true },
        ],
      })
    })
  })

  return (
    <>
      {backgroundElement}
      <div className="reveal" style={{ position: 'absolute' }}>
        <div className="slides">{children}</div>
      </div>
    </>
  )
}
