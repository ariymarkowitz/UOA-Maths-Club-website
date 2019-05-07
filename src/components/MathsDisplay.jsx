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

async function parse(text) {
  const result = await processor.process(text);
  return result.toString();
}

const useParser = (text) => {
  const [parsedText, setParsedText] = useState('');

  useEffect(() => {
    parse(text).then((result) => {
      setParsedText(result);
    });
  }, [text]);

  return parsedText;
};

const MathsDisplay = ({ text }) => {
  const parsedText = useParser(text);
  return <div dangerouslySetInnerHTML={{ __html: parsedText }} />;
};

export default MathsDisplay;
