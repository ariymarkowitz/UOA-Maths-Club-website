import React, { useState } from 'react';
import { preventDefault } from '../../../../../lib/utils/client';

export default function ({ titleHook, questionHook, ...props }) {
  const [title, setTitle] = titleHook;
  const [question, setQuestion] = questionHook;

  return (
    <div {...props}>
      <input
        type="text"
        name="title"
        onInput={(e) => {
          setTitle(e.target.value);
          e.preventDefault();
          return true;
        }}
      />
      <div
        contentEditable
        style={{
          width: '100%',
          height: '100%'
        }}
        onInput={(e => setTitle(e.target.value)) |> preventDefault}
      />
    </div>
  );
}
