module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      email: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      password: { type: Sequelize.STRING(255), allowNull: false },
      role: { type: Sequelize.ENUM('super_admin','school_admin','principal','teacher','parent','student','accountant','librarian','transport','hostel','hr'), allowNull: false },
      school_id: { type: Sequelize.INTEGER, references: { model: 'schools', key: 'id' } },
      is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
      last_login: Sequelize.DATE,
      two_factor_secret: Sequelize.STRING,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  }
};