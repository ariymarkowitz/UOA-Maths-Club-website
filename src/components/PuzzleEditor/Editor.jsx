import React, { useState } from 'react';
import Preview from './components/Preview';
import Input from './components/Input';
import Page from '../Page';

export default function () {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');

  return (
    <Page>
      <Input titleHook={[title, setTitle]} questionHook={[question, setQuestion]} />
      <Preview title={title} question={question} />
    </Page>
  );
}
