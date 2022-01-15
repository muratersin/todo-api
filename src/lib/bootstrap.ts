import restify, { Server, plugins } from 'restify';
// import { NotFoundError } from 'restify-errors';

import router from './router';
import log from './logger';
import throttleConfig from '../config/throttle.config';
import serverConfig from '../config/server.config';

export default function bootstrap() {
  const server: Server = restify.createServer(serverConfig);

  server.pre(plugins.pre.dedupeSlashes());
  server.pre(plugins.pre.context());

  server.use(plugins.requestLogger());
  server.use(plugins.queryParser());
  server.use(plugins.bodyParser());
  server.use(plugins.gzipResponse());
  server.use(plugins.throttle(throttleConfig));

  // configure routes
  router(server);

  server.listen(process.env.PORT || 3000, () => {
    log.info(`${server.name} listening at ${server.url}`);
  });

  server.on('InternalServer', (req, res, err, callback) => {
    log.error(err);
    return callback();
  });

  server.on('restifyError', (req, res, err, callback) => {
    log.error(err);
    return callback();
  });
}

// TODO: Error handling, global error, 404 log
// TODO: security (cors, helmet)
// TODO: accept json only
