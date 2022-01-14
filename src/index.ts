if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  require('dotenv').config();
}

import bootstrap from './lib/bootstrap';
import { connect } from './lib/postgre-connection';
import log from './lib/logger';

async function start() {
  try {
    await connect();
    bootstrap();
  } catch (err) {
    log.error("Couln't start TodoApi: ", err);
  }
}
start();
