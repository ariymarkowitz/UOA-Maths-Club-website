import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import useInterval from '../../lib/utils/useInterval';
import useEventHandler from '../../lib/utils/useEventHandler';

const mod = (x, n) => ((x % n) + n) % n;

const indexFromKey = (list, key) => list.findIndex(([k]) => k === key);
const formatTarget = (list, t) => {
  let f;
  if (!f) {
    f = 0;
  } else if (Number.isInteger(t)) {
    f = t;
  } else if (typeof t === 'string') {
    f = indexFromKey(list, t);
  } else {
    throw TypeError('Property `target` must be a string or integer.');
  }

  return mod(f, list.length);
};

const Page = ({ children, revealed }) => {
  const [state, setState] = useState(revealed ? 'initial-revealed' : 'initial-hidden');

  useEffect(() => {
    if (revealed && state !== 'initial-revealed') setState('revealed');
    else if (!revealed && state !== 'initial-hidden') setState('hidden');
  }, [revealed]);

  return (
    <section
      className={classNames({
        page: true,
        'page-revealed': state === 'revealed',
        'page-hidden': state === 'hidden',
        'page-initial-revealed': state === 'initial-revealed',
        'page-initial-hidden': state === 'initial-hidden'
      })}
      aria-hidden={state === 'hidden' || state === 'initial-hidden'}
    >
      <div className="page-inner" role="presentation">
        {children}
      </div>
    </section>
  );
};

const Presentation = ({
  background, parallax = 0, pages, target
}) => {
  const [page, setPage] = useState(formatTarget(pages, target));

  const [pageReq, _setPageReq] = useState(page);

  const requestPage = (req) => {
    if (req !== pageReq) _setPageReq(req);
  };

  const requestPrevPage = () => requestPage(mod(page - 1, pages.length));
  const requestNextPage = () => requestPage(mod(page + 1, pages.length));

  const dispatch = useInterval(requestNextPage, 10000);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      dispatch({ type: 'restart' });
      requestPrevPage();
    } else if (e.key === 'ArrowRight') {
      dispatch({ type: 'restart' });
      requestNextPage();
    }
  };

  useEventHandler(document, 'keydown', onKeyDown);

  // Handle changes in `pages`
  useEffect(() => {
    if (page >= pages.length) requestPage(pages.length - 1);
  }, [pages]);

  // Go to another page
  useEffect(() => {
    if (pageReq !== page) {
      setPage(pageReq);
    }
  }, [pageReq]);

  const width = 1 + parallax * (pages.length - 1);
  const translation = -(parallax * page);

  return (
    <>
      <div
        className="background"
        style={{ width: `${width * 100}%`, transform: `translateX(${translation * 100}%)` }}
      >
        {background}
      </div>
      {pages.map(([key, Component], index) => (
        <Page key={key} revealed={page === index}>
          {Component}
        </Page>
      ))}
    </>
  );
};

export default Presentation;
