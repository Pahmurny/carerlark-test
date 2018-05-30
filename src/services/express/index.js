import express from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import debug from 'debug';
import { env } from '../../config';

const logError = debug('api:error');

export default (apiRoot, routes) => {
  const app = express();
  app.use(helmet());

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors());
    app.use(compression());
    app.use(morgan('dev'));
  }

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(apiRoot, routes);

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      logError(err);
      res.status(err.code || 400)
        .json({
          status: 'error',
          message: err.message,
          err,
        });
    });
  }
  // production error handler
  // no stacktraces leaked to user
  app.use((err, req, res, next) => {
    logError(err);
    res.status(err.status || 400)
      .json({
        status: 'error',
        message: err.message,
      });
  });

  return app;
};
