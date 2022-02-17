module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING,
      },
      createdAt: {
        defaultValue: Sequelize.fn('NOW'),
        createdAt: true,
        type: Sequelize.DATE,
      },
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('users');
  },
};
