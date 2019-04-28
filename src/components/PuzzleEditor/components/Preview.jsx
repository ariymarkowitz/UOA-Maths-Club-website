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

const useParser = (textState) => {
  const [parsedText, setParsedText] = useState('');

  useEffect(() => {
    parse(textState).then((result) => {
      setParsedText(result);
    });
  }, [textState]);

  return [parsedText, setParsedText];
};

function Preview({
  title, content, solution, ...props
}) {
  const [parsedTitle, setParsedTitle] = useParser(title);
  const [parsedQuestion, setParsedQuestion] = useParser(content);
  const [parsedSolution, setParsedSolution] = useParser(solution);

  return (
    <div {...props}>
      <h3 dangerouslySetInnerHTML={{ __html: parsedTitle }} />
      <div dangerouslySetInnerHTML={{ __html: parsedQuestion }} />
      <div dangerouslySetInnerHTML={{ __html: parsedSolution }} />
    </div>
  );
}

export default Preview;
