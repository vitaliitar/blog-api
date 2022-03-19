module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('refresh_tokens', {
      id: {
        primaryKey: true,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        type: Sequelize.UUID,
      },
      userId: {
        type: Sequelize.UUID,
      },
      isRevoked: {
        type: Sequelize.BOOLEAN,
      },
      expires: {
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addConstraint('refresh_tokens', {
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
    await queryInterface.removeConstraint(
      'refresh_tokens',
      'refresh_tokens_userId_users_fk',
    );

    await queryInterface.dropTable('refresh_tokens');
  },
};
