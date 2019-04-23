import React, { useState } from 'react';
import datetime from 'node-datetime';
import Page from './Page';

function formatDate(date) {
  return date.format('D f Y');
}

function Main() {
  const [date, setDate] = useState(datetime.create());

  return (
    <Page>
      <h1>Welcome to Polygon!</h1>
      <h3>{formatDate(date)}</h3>
    </Page>
  );
}

export default Main;
