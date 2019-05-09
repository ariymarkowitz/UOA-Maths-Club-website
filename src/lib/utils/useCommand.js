import React, { useState, useEffect } from 'react';

function useCommand(callback, initState, initAction) {
  const [state, setState] = useState(initState);
  const [dispatch, setDispatch] = useState({ action: initAction, pulse: 1 });

  useEffect(() => {
    const [newState, cleanup] = callback(state, dispatch.action);
    setState(newState);
    return cleanup;
  }, [dispatch]);

  return (action) => {
    setDispatch({ action, pulse: -dispatch.pulse });
  };
}

export default useCommand;
