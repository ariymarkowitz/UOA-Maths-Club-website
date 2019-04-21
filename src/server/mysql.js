import mysql from 'async-mysql';
import databaseInfo from '../secret/database-info.yaml';

const connection = null;

async function connect() {
  if (connection) {
    return connection;
  }

  return mysql.connect(databaseInfo);
}

async function getPuzzles() {
  const conn = await connect();
  const rows = await conn.query(`SELECT * FROM puzzles`);
  return rows;
}

export default getPuzzles;
