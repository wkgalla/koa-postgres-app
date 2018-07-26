//@ts-ignore
import config from './index'

const user = config.get('database.username');
const host = config.get('database.host');
const database = config.get('database.name');
const password = config.get('database.password');
const port = config.get('database.port');
const dialect = 'postgres';

module.exports = {
  development: {
    username: user,
    password: password,
    database: database,
    host: host,
    dialect: dialect,
    port: port
  },
  test: {
    username: user,
    password: password,
    database: database,
    host: host,
    dialect: dialect,
    port: port
  },
  production: {
    username: user,
    password: password,
    database: database,
    host: host,
    dialect: dialect,
    port: port
  }
}
