import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import MathsDisplay from '../MathsDisplay';
import TextFit from '../TextFit/TextFit';

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
  else if (dataFound) {
    content = (
      <TextFit>
        <MathsDisplay text={question} />
      </TextFit>
    );
  } else content = <div>No data found!</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h2>Puzzle of the Week</h2>
      <hr style={{ width: '100%' }} />
      {content}
    </div>
  );
};

export default MathsPuzzle;
