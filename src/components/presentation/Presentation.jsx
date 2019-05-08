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

const Presentation = ({ pages, target }) => {
  const [page, setPage] = useState(formatTarget(pages, target));
  const [pageReq, _setPageReq] = useState(page);

  const requestPage = (req) => {
    if (req !== pageReq) _setPageReq(mod(req, pages.length));
  };

  const requestPrevPage = () => requestPage(page - 1);
  const requestNextPage = () => requestPage(page + 1);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') requestPrevPage();
    else if (e.key === 'ArrowRight') requestNextPage();
  };

  useEventHandler(document, 'keydown', onKeyDown);
  useInterval(requestNextPage, 10000);

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

  return (
    <>
      {pages.map(([key, Component], index) => (
        <Page key={key} revealed={page === index}>
          {Component}
        </Page>
      ))}
    </>
  );
};

export default Presentation;
