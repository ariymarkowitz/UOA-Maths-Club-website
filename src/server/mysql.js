import mysql from 'mysql2';
import databaseInfo from '../secret/database-info.yaml';

const pool = mysql.createPool({ ...databaseInfo }).promise();

export async function getPuzzles() {
  try {
    const [results] = await pool.query(
      'SELECT title, question FROM puzzles where `display-date` < NOW()'
    );
    return results;
  } catch (e) {
    throw e;
  }
}

export async function addPuzzle(title, question, solution) {
  const command = 'INSERT into `puzzles` (title, question, solution) VALUES (?, ?, ?)';
  try {
    return await pool.execute(command, [title, question, solution]);
  } catch (e) {
    throw e;
  }
}
