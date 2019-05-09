import React, { useEffect, useRef } from 'react';
import useCommand from './useCommand';

function useInterval(callback, initDelay) {
  const savedCallback = useRef(callback);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  const dispatch = useCommand(
    (state, action) => {
      function tick() {
        savedCallback.current();
      }
      const resetTimer = (delay) => {
        if (delay !== null) {
          const id = setInterval(tick, delay);
          return () => clearInterval(id);
        }
      };

      switch (action.type) {
      case 'start': {
        const delay = action.delay === undefined ? state.delay : action.delay;
        return [{ ...state, delay }, resetTimer(delay)];
      }
      case 'stop':
        return [state, resetTimer(null)];
      case 'restart':
        return [state, resetTimer(state.delay)];
      default:
        return [state];
      }
    },
    { delay: initDelay },
    { type: 'start' }
  );

  return dispatch;
}

export default useInterval;
