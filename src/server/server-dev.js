import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack.dev.config';

import serverCommon from './server-common';

const app = express();
const DIST_DIR = __dirname;
const compiler = webpack(config);

function sendHtmlFile(res, next, filePath) {
  const fs = compiler.outputFileSystem;
  const fullPath = path.join(filePath, 'index.html');
  if (fs.existsSync(fullPath)) {
    fs.readFile(fullPath, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
  } else {
    return next();
  }
}

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })
);

app.use(webpackHotMiddleware(compiler));

serverCommon(app);

app.get('*', (req, res, next) => sendHtmlFile(res, next, DIST_DIR));
app.get('*', (req, res, next) => sendHtmlFile(res, next, config.output.path));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log('Press Ctrl+C to quit.');
});
