import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import remark from 'remark';
import math from 'remark-math';
import katex from 'remark-html-katex';
import html from 'remark-html';
import MathsDisplay from '../MathsDisplay';

const processor = remark()
  .use(math)
  .use(katex)
  .use(html);

const MathsPuzzle = () => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataFound, setDataFound] = useState(false);

  const fetch = () => {
    setLoading(true);

    Axios.get('/api/puzzles').then(({ data }) => {
      if (data.length === 0) {
        setDataFound(false);
      } else {
        setDataFound(true);
        setQuestion(data[0].question);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  let content;
  if (loading) content = <div>Loading</div>;
  else if (dataFound) content = <MathsDisplay text={question} />;
  else content = <div>No data found!</div>;

  return (
    <>
      <h2>Puzzle of the Week</h2>
      <hr />
      {content}
    </>
  );
};

export default MathsPuzzle;
