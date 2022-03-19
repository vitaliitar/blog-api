module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('users', 'username', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('users', 'password', {
        type: Sequelize.STRING,
      }),
    ]);
  },
  async down(queryInterface) {
    return Promise.all([
      queryInterface.removeColumn('users', 'username'),
      queryInterface.removeColumn('users', 'password'),
    ]);
  },
};
