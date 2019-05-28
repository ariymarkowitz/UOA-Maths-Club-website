import { Router } from 'express';
import passwordHash from 'password-hash';
import multer from 'multer';
import bodyParser from 'body-parser';
import { getPuzzles, addPuzzle, getLastSolution } from './mysql';
import Admin from '../secret/admin.yaml';

const upload = multer();

export default (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const apiRouter = new Router();
  apiRouter.get('/api/puzzles', (req, res) => {
    getPuzzles()
      .catch(() => res.json({ error: true }))
      .then(result => res.json(result));
  });

  apiRouter.get('/api/solution', (req, res) => {
    getLastSolution()
      .catch(() => res.json({ error: true }))
      .then(result => res.json(result));
  });

  apiRouter.post('/api/addPuzzle', upload.none(), ({ body }, res) => {
    if (!passwordHash.verify(body.password, Admin.passwordHash)) {
      res.json({ status: 'error', message: 'Invalid password' });
    } else {
      addPuzzle(body.title, body.content, body.solution)
        .catch(error => res.json({ status: 'error', message: error.message }))
        .then(() => res.json({ status: 'success' }));
    }
  });

  app.use(apiRouter);
};
