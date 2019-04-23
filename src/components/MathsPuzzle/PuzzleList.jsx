import React, { useState } from 'react';
import ReactTable from 'react-table';
import Axios from 'axios';

function PuzzleList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      Header: 'id',
      accessor: 'id'
    },
    {
      Header: 'Title',
      accessor: 'title'
    },
    {
      Header: 'Date added',
      accessor: 'date-added'
    }
  ];

  const fetch = () => {
    setLoading(true);

    Axios.get('/api/puzzles').then((rows) => {
      setData(rows.data);
      setLoading(false);
    });
  };

  return (
    <ReactTable
      columns={columns}
      data={data}
      pages={1}
      loading={loading}
      manual
      onFetchData={fetch}
    />
  );
}

export default PuzzleList;
