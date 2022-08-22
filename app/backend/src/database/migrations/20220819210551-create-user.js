module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('users', {
     id: {
       type: Sequelize.INTEGER,
       allowNull: false,
       primaryKey: true,
       autoIncrement: true,
     },
     username: {
      allowNull: false,
      type: Sequelize.STRING,
    },
     role: {
       type: Sequelize.STRING,
     },
     email: {
       allowNull: false,
       type: Sequelize.STRING,
     },
     password: {
       allowNull: false,
       type: Sequelize.STRING,
     },
   });
 },

 async down (queryInterface, _Sequelize) {
   await queryInterface.dropTable('users');
 },
};