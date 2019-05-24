import React, { useRef, useLayoutEffect, useState } from 'react';
import classNames from 'classnames';

function TextFit({ className, children, ...props }) {
  const container = useRef();
  const containerInner = useRef();
  const timeout = useRef();

  const steps = 10;
  const minScale = 0.2;
  const [fontScale, setFontScale] = useState(steps);

  useLayoutEffect(() => {
    if (!container) {
      return;
    }
    function adjustHeight() {
      const containerHeight = container.current.clientHeight;
      const contentHeight = containerInner.current.scrollHeight;
      const stepFactor = minScale ** (1 / steps);

      if (containerHeight < contentHeight) {
        setFontScale(s => Math.max(s - 1, 0));
        timeout.current = setTimeout(adjustHeight, 500);
      } else if (contentHeight / containerHeight < stepFactor * 0.8) {
        setFontScale(s => Math.min(s + 1, steps));
        timeout.current = setTimeout(adjustHeight, 500);
      }
    }
    timeout.current = setTimeout(adjustHeight, 100);
    return () => clearTimeout(timeout.current);
  });

  const scale = minScale ** (1 - fontScale / steps);

  return (
    <div
      className={classNames(className, 'text-fit')}
      style={{ fontSize: `${scale * 100}%` }}
      ref={container}
      {...props}
    >
      <div className="text-fit-inner" ref={containerInner}>
        {children}
      </div>
    </div>
  );
}

export default TextFit;
