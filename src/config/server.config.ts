import { ServerOptions } from 'restify';

const serverConfig: ServerOptions = {
  dtrace: false,
  handleUncaughtExceptions: false,
  name: 'TodoApi',
  onceNext: true,
  strictNext: true,
};

export default serverConfig;
