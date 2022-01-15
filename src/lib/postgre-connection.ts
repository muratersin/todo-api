import { createConnection } from 'typeorm';

import { User } from '../modules/user';
import { Todo } from '../modules/todo';
import { Group } from '../modules/group';

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
