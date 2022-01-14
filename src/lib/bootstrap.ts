import restify, { Server, plugins } from 'restify';
import { NotFoundError } from 'restify-errors';

import router from './router';
import log from './logger';
import throttleConfig from '../config/throttle.config';
import serverConfig from '../config/server.config';

export default function bootstrap() {
  const server: Server = restify.createServer(serverConfig);

  server.pre(plugins.pre.dedupeSlashes());

  server.use(plugins.requestLogger());
  server.use(plugins.queryParser());
  server.use(plugins.bodyParser());
  server.use(plugins.gzipResponse());
  server.use(plugins.throttle(throttleConfig));

  // configure routes
  router(server);

  server.use((req, res, next) => next(new NotFoundError('not here!')));

  server.listen(process.env.PORT || 3000, () => {
    log.info(`${server.name} listening at ${server.url}`);
  });
}

// TODO: Error handling, global error, 404
// TODO: security (cors, helmet)
// TODO: jwt parser middleware
// TODO: Joi
// TODO: accept json only
