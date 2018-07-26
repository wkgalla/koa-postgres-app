import * as Sequelize from 'sequelize'
export default (sequelize: Sequelize.Sequelize) => {
  var User = sequelize.define('User', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    phoneNumber: Sequelize.STRING,
    address: Sequelize.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};