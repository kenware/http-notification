module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AccessKeys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      secreteKey: {
        type: Sequelize.STRING,
      },
      accountId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Accounts',
          },
          key: 'id',
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AccessKeys');
  },
};
