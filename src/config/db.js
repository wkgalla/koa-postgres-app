import { Pool } from 'pg';

const pool = new Pool({
  user: 'koaapp',
  host: 'postgres',
  database: 'koaapp',
  password: 'nodeapp',
  port: 5432,
});

export default pool;