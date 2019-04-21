import { Router } from 'express';
import getPuzzles from './mysql';

export default (app) => {
  const router = new Router();
  router.get('/api/puzzles', (req, res) => {
    getPuzzles()
      .catch(() => res.json({ error: true }))
      .then(result => res.json(result));
  });

  app.use(router);
};
