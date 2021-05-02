const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AccessKey extends Model {
    static associate(models) {
      AccessKey.belongsTo(models.Account, {
        foreignKey: 'accountId',
        onDelete: 'CASCADE',
      });
    }
  }
  AccessKey.init({
    secreteKey: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'AccessKey',
  });
  return AccessKey;
};
