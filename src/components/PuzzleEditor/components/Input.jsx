import React, { useState } from 'react';
import Axios from 'axios';

function Input({
  titleHook, contentHook, solutionHook, ...props
}) {
  const [title, setTitle] = titleHook;
  const [content, setContent] = contentHook;
  const [solution, setSolution] = solutionHook;
  const [password, setPassword] = useState();

  function handleSubmit() {
    Axios.post('/api/addPuzzle', {
      title, content, solution, password
    }).then(({ data }) => {
      if (data.status === 'error') {
        alert(`Error: ${data.message}`);
      } else {
        alert('Success!');
      }
    });
  }

  return (
    <div {...props}>
      <input type="text" data-lpignore="true" onInput={e => setTitle(e.target.value)} />
      <textarea onInput={e => setContent(e.target.value)} />
      <textarea onInput={e => setSolution(e.target.value)} />
      <input type="password" data-lpignore="true" onInput={e => setPassword(e.target.value)} />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default Input;
