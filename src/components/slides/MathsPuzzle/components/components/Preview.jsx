import React from 'react';

export default function ({ title, question, ...props }) {
  return (
    <div {...props}>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: question }} />
    </div>
  );
}
