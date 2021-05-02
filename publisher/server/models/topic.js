const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    static associate(models) {
      Topic.belongsTo(models.Account, {
        foreignKey: 'accountId',
        onDelete: 'CASCADE',
      });
      Topic.hasMany(models.Subscription, {
        foreignKey: 'topicId',
        as: 'subscribers',
      });
    }
  }
  Topic.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Topic',
  });
  return Topic;
};
