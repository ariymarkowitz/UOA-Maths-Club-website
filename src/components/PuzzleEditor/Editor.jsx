import React, { useState } from 'react';
import Preview from './components/Preview';
import Input from './components/Input';

export default function () {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [solution, setSolution] = useState('');

  return (
    <div className="page editor">
      <Input
        titleHook={[title, setTitle]}
        contentHook={[content, setContent]}
        solutionHook={[solution, setSolution]}
        className="editor-input"
      />
      <Preview title={title} content={content} solution={solution} className="editor-preview" />
    </div>
  );
}
