import { ConnectionConfig } from 'pg';

const postgreConfig: ConnectionConfig = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: Number(process.env.PG_PORT),
};

export default postgreConfig;
