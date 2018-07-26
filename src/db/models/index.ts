import * as Sequelize from 'sequelize';
import userModel from "./user"

const env: string = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/database.ts')[env];

let sequelize: Sequelize.Sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = {
  sequelize,
  Sequelize,
  User: userModel(sequelize)
}

Object.keys(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
