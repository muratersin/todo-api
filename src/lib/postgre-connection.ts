import { createConnection } from 'typeorm';

// import postgreConfig from '../config/postgre.config';
import User from '../entity/User';
import Todo from '../entity/Todo';
import Group from '../entity/Group';

export function connect() {
  return createConnection({
    type: 'postgres',
    url: process.env.PG_URI,
    ssl: {
      rejectUnauthorized: false,
    },
    entities: [User, Todo, Group],
    synchronize: true, // use migration for production
  });
}

// TODO: remove config
