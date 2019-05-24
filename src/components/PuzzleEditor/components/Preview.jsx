/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import remark from 'remark';
import math from 'remark-math';
import katex from 'remark-html-katex';
import html from 'remark-html';
import MathsDisplay from '../../MathsDisplay';
import TextFit from '../../TextFit/TextFit';

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
  return (
    <div {...props}>
      <MathsDisplay className="editor-preview-title" text={`#### ${title}`} />
      <TextFit className="editor-preview-question">
        <MathsDisplay text={content} />
      </TextFit>
      <hr style={{ width: '100%' }} />
      <TextFit className="editor-preview-solution">
        <MathsDisplay text={solution} />
      </TextFit>
    </div>
  );
}

export default Preview;
