import { ServerOptions } from 'restify';

const serverConfig: ServerOptions = {
  name: 'TodoApi',
  onceNext: true,
  strictNext: true,
};

export default serverConfig;
