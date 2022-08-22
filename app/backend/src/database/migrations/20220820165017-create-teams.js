module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('teams', {
     id: {
       type: Sequelize.INTEGER,
       allowNull: false,
       primaryKey: true,
       autoIncrement: true,
     },
     team_name: {
       allowNull: false,
       type: Sequelize.STRING,
     },
   });
 },

 async down (queryInterface, _Sequelize) {
   await queryInterface.dropTable('teams');
 },
};