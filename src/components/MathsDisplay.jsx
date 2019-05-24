/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import remark from 'remark';
import math from 'remark-math';
import remark2rehype from 'remark-rehype';
import katex from 'rehype-katex';
import stringify from 'rehype-stringify';
import mathInline from 'remark-math/inline';

// Raw String => MDAST => HAST => transformed HAST => HTML
const processor = remark()
  .use(math)
  .use(remark2rehype)
  .use(katex)
  .use(stringify);

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

const MathsDisplay = ({ text, ...props }) => {
  const parsedText = useParser(text);
  return <div dangerouslySetInnerHTML={{ __html: parsedText }} {...props} />;
};

export default MathsDisplay;
