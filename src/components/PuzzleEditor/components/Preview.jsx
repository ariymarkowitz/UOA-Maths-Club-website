/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import remark from 'remark';
import math from 'remark-math';
import katex from 'remark-html-katex';
import html from 'remark-html';

const processor = remark()
  .use(math)
  .use(katex)
  .use(html);

function Preview({ title, content, ...props }) {
  const [contentHTML, setContentHTML] = useState('');

  async function parse(text) {
    const result = await processor.process(text);
    return result.toString();
  }

  useEffect(() => {
    parse(content).then((result) => {
      setContentHTML(result);
    });
  }, [content]);

  return (
    <div {...props}>
      <h3>{title}</h3>
      <div dangerouslySetInnerHTML={{ __html: contentHTML }} />
    </div>
  );
}

export default Preview;
