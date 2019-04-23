/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import remark from 'remark';
import math from 'remark-math';
import katex from 'remark-html-katex';
import html from 'remark-html';

const processor = remark()
  .use(math)
  .use(katex)
  .use(html, { sanitize: true });

function Preview({ title, question, ...props }) {
  const [questionHTML, setQuestionHTML] = useState('');

  async function parse(text) {
    const result = await processor.process(text);
    return result.toString();
  }

  useEffect(() => {
    parse(question).then((result) => {
      setQuestionHTML(result);
    });
  }, [question]);

  return (
    <div {...props}>
      <h3>{title}</h3>
      <div dangerouslySetInnerHTML={{ __html: questionHTML }} />
    </div>
  );
}

export default Preview;
