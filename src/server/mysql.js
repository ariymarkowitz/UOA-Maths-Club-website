import mysql from 'mysql2';
import databaseInfo from '../secret/database-info.yaml';

const pool = mysql.createPool({ ...databaseInfo }).promise();

async function getPuzzles() {
  const [results] = await pool.query(`SELECT * FROM puzzles`);
  return results;
}

export default getPuzzles;
