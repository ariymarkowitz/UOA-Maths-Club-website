import React, { useState, useEffect, useRef } from 'react';

function useEventHandler(target, event, callback) {
  const savedCallback = useRef(callback);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function callback(e) {
      savedCallback.current(e);
    }

    if (event !== null) {
      target.addEventListener(event, callback);
      return () => target.removeEventListener(event, callback);
    }
  }, [target, event]);
}

export default useEventHandler;
