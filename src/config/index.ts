import * as convict from 'convict';
import {Config} from 'convict'

const config: Config<object> = convict({
	env: {
    doc: "The applicaton environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV"
  },
  database: {
    host: {
      doc: 'database host',
      format: '*',
      default: 'localhost',
      env: 'DB_HOST'
    },
    name: {
      doc: 'database name',
      format: String,
      default: 'koaapp',
      env: 'DB_NAME'
    },
    port: {
      doc: 'The db port to bind.',
      format: '*',
      default: 5432,
      env: 'DB_PORT'
    },
    username: {
      doc: 'Database Username',
      format: String,
      default: 'koaapp',
      env: 'DB_USERNAME'
    },
    password: {
      doc: 'Database Username',
      format: '*',
      default: 'nodeapp',
      env: 'DB_PASSWORD'
    },
  }
})

export default config