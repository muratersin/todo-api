import restify, { Server, plugins } from 'restify';
import helmet from 'helmet';

import router from './router';
import log from './logger';
import throttleConfig from '../config/throttle.config';
import serverConfig from '../config/server.config';
import corsMiddleware from '../middlewares/cors.middleware';
import requestLoggerMiddleware from '../middlewares/request-logger.middleware';

export default function bootstrap() {
  const server: Server = restify.createServer(serverConfig);

  server.pre(plugins.pre.dedupeSlashes());
  server.pre(plugins.pre.context());
  server.pre(corsMiddleware.preflight);

  server.use(helmet());
  server.use(corsMiddleware.actual);
  server.use(plugins.requestLogger());
  server.use(plugins.queryParser());
  server.use(plugins.bodyParser());
  server.use(plugins.gzipResponse());
  server.use(plugins.throttle(throttleConfig));
  server.use(requestLoggerMiddleware);

  // configure routes
  router(server);

  server.listen(process.env.PORT || 3000, () => {
    log.info(`${server.name} listening at ${server.url}`);
  });

  server.on('InternalServer', (req, res, err, callback) => {
    log.error(err);
    // TODO: critical errors may record to a file or database
    return callback();
  });

  server.on('restifyError', (req, res, err, callback) => {
    log.error(err);
    return callback();
  });
}

// TODO: accept json only
