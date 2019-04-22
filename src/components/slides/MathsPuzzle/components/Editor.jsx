import React, { useState } from 'react';
import Preview from './components/Preview';
import Input from './components/Input';

export default function () {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%'
      }}
    >
      <Preview style={{ flex: 0.5 }} title={title} question={question} />
      <Input
        style={{ flex: 0.5 }}
        titleHook={[title, setTitle]}
        questionHook={[question, setQuestion]}
      />
    </div>
  );
}
