import React, { useState } from 'react';
import Preview from './components/Preview';
import Input from './components/Input';

export default function () {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [solution, setSolution] = useState('');

  return (
    <div>
      <Input
        titleHook={[title, setTitle]}
        contentHook={[content, setContent]}
        solutionHook={[solution, setSolution]}
      />
      <Preview title={title} content={content} solution={solution} />
    </div>
  );
}
