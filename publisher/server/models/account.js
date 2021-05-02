const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      Account.hasMany(models.AccessKey, {
        foreignKey: 'accountId',
        as: 'accessKeys',
      });
      Account.hasMany(models.Topic, {
        foreignKey: 'accountId',
        as: 'topics',
      });
    }
  }
  Account.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};
