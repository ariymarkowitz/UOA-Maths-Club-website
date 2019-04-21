import { Router } from 'express';

export default (app) => {
  const router = new Router();
  router.get('/api', (req, res) => {
    res.send('wow!');
  });

  app.use(router);
};
