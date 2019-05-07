/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import remark from 'remark';
import math from 'remark-math';
import katex from 'remark-html-katex';
import html from 'remark-html';
import MathsDisplay from '../../MathsDisplay';

const processor = remark()
  .use(math)
  .use(katex)
  .use(html);

async function parse(text) {
  const result = await processor.process(text);
  return result.toString();
}

const useParser = (textState) => {
  const [parsedText, setParsedText] = useState('');

  useEffect(() => {
    parse(textState).then((result) => {
      setParsedText(result);
    });
  }, [textState]);

  return parsedText;
};

function Preview({
  title, content, solution, ...props
}) {
  const parsedTitle = useParser(title);

  return (
    <div {...props}>
      <h3 dangerouslySetInnerHTML={{ __html: parsedTitle }} />
      <MathsDisplay text={content} />
      <MathsDisplay text={solution} />
    </div>
  );
}

export default Preview;
