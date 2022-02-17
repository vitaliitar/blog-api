module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: {
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        type: Sequelize.UUID,
      },
      userId: {
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.STRING,
      },
      createdAt: {
        defaultValue: Sequelize.fn('NOW'),
        createdAt: true,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint('posts', {
      type: 'foreign key',
      fields: ['userId'],
      references: {
        table: 'users',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },
  async down(queryInterface) {
    await queryInterface.removeConstraint('posts', 'posts_userId_users_fk');

    await queryInterface.dropTable('posts');
  },
};
