import React, { useState } from 'react';
import datetime from 'node-datetime';

function formatDate(date) {
  return date.format('D f Y');
}

function FrontPage() {
  const [date] = useState(datetime.create());

  return (
    <>
      <h1>Welcome to the Maths Club!</h1>
      <p className="subtitle">{formatDate(date)}</p>
    </>
  );
}

export default FrontPage;
