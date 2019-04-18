import React, { useEffect } from 'react';
import Head from 'next/head';

import '../../lib/reveal/css/reset.css';
import '../../lib/reveal/css/reveal.css';
import '../../lib/reveal/css/theme/sky.css';

export default function Reveal(props) {
  useEffect(() => {
    const _Reveal = require('../../lib/reveal/js/reveal.js').default;

    _Reveal.initialize({
      dependencies: [
        { src: 'plugin/markdown/marked.js' },
        { src: 'plugin/markdown/markdown.js' },
        { src: 'plugin/notes/notes.js', async: true },
        { src: 'plugin/highlight/highlight.js', async: true }
      ]
    });
  });

  return (
    <>
      <Head>
        <style>{`#__next {
                            height: 100%;
                            overflow: hidden;
                            position: relative;
                        }`}</style>
        <meta key="reveal" />
      </Head>
      {props.backgroundElement}
      <div className="reveal">
        <div className="slides">{props.children}</div>
      </div>
    </>
  );
}
