const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    static associate(models) {
      // define association here
      Subscription.belongsTo(models.Topic, {
        foreignKey: 'topicId',
        onDelete: 'CASCADE',
      });
    }
  }
  Subscription.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Subscription',
  });
  return Subscription;
};
