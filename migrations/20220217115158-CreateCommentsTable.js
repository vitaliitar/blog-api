module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      id: {
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        type: Sequelize.UUID,
      },
      userId: {
        type: Sequelize.UUID,
      },
      postId: {
        type: Sequelize.UUID,
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

    await queryInterface.addConstraint('comments', {
      type: 'foreign key',
      fields: ['userId'],
      references: {
        table: 'users',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('comments', {
      type: 'foreign key',
      fields: ['postId'],
      references: {
        table: 'posts',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },
  async down(queryInterface) {
    await queryInterface.removeConstraint(
      'comments',
      'comments_userId_users_fk',
    );

    await queryInterface.removeConstraint(
      'comments',
      'comments_postId_posts_fk',
    );

    await queryInterface.dropTable('comments');
  },
};
