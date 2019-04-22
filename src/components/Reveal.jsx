import React, { useEffect } from 'react';

import '../lib/reveal/css/reset.css';
import '../lib/reveal/css/reveal.scss';
import '../lib/reveal/css/theme/source/sky.scss';

const Reveal = ({ backgroundElement, children }) => {
  useEffect(() => {
    import('../lib/reveal/js/reveal.js').then((module) => {
      const RevealModule = module.default;
      RevealModule.initialize({
        dependencies: [
          { src: 'plugin/markdown/marked.js' },
          { src: 'plugin/markdown/markdown.js' },
          { src: 'plugin/notes/notes.js', async: true },
          { src: 'plugin/highlight/highlight.js', async: true }
        ],
        keyboard: {
          191: null
        }
      });
      RevealModule.sync();
    });
  });

  return (
    <>
      {backgroundElement}
      <div className="reveal" style={{ position: 'absolute' }}>
        <div className="slides">{children}</div>
      </div>
    </>
  );
};

export default Reveal;
