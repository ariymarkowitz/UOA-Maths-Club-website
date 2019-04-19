import React, { useState } from 'react'
import datetime from 'node-datetime'

function formatDate(date) {
  return date.format('D f Y')
}

function Main() {
  const [date] = useState(datetime.create())

  return (
    <section>
      <h1>Welcome to Polygon!</h1>
      <h3>{formatDate(date)}</h3>
    </section>
  )
}

export default Main
