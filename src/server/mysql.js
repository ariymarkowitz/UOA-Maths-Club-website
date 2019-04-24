import mysql from 'mysql2';
import databaseInfo from '../secret/database-info.yaml';

const pool = mysql.createPool({ ...databaseInfo }).promise();

export async function getPuzzles() {
  const [results] = await pool.query(`SELECT * FROM puzzles`);
  return results;
}

export async function addPuzzle(title, question) {
  const command = 'INSERT into `puzzles` (title, question) VALUES (?, ?)';
  try {
    return await pool.execute(command, [title, question]);
  } catch (e) {
    throw e;
  }
}
