import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import MathsDisplay from '../MathsDisplay';
import TextFit from '../TextFit/TextFit';

const MathsPuzzleSolution = () => {
  const [solution, setSolution] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataFound, setDataFound] = useState(false);

  const fetch = () => {
    setLoading(true);

    Axios.get('/api/solution').then(({ data }) => {
      if (data.length === 0) {
        setDataFound(false);
      } else {
        setDataFound(true);
        setSolution(data[0].solution);
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
        <MathsDisplay text={solution} />
      </TextFit>
    );
  } else content = <div>No data found!</div>;

  return (
    <>
      <h2>Solution to last week&#39;s puzzle</h2>
      <hr />
      {content}
    </>
  );
};

export default MathsPuzzleSolution;
