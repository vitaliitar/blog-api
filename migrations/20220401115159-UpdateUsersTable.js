module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'stripe_id', {
      type: Sequelize.STRING,
    });
  },
  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'stripe_id');
  },
};
