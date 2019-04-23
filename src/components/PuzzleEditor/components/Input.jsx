import React from 'react';

function Input({
  titleHook, questionHook, handleSubmit, ...props
}) {
  const [title, setTitle] = titleHook;
  const [question, setQuestion] = questionHook;

  return (
    <div {...props}>
      <input type="text" onInput={e => setTitle(e.target.innerText)} />
      <textarea onInput={e => setQuestion(e.target.value)} />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default Input;
