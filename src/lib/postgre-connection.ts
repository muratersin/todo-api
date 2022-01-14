import { createConnection } from 'typeorm';

import postgreConfig from '../config/postgre.config';
import UserCredential from '../entity/UserCredential';
import User from '../entity/User';
import Todo from '../entity/Todo';
import Group from '../entity/Group';

export function connect() {
  return createConnection({
    type: 'postgres',
    host: postgreConfig.host,
    port: postgreConfig.port,
    username: postgreConfig.user,
    password: postgreConfig.password,
    database: postgreConfig.database,
    ssl: {
      rejectUnauthorized: false,
    },
    entities: [User, UserCredential, Todo, Group],
    synchronize: true,
  });
}
