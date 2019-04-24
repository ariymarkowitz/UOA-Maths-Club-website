import React, { useState } from 'react';
import Preview from './components/Preview';
import Input from './components/Input';
import Page from '../Page';

export default function () {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <Page>
      <Input titleHook={[title, setTitle]} contentHook={[content, setContent]} />
      <Preview title={title} content={content} />
    </Page>
  );
}
