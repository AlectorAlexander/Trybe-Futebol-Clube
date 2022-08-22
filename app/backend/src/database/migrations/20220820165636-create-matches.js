module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('matches', {
     id: {
       type: Sequelize.INTEGER,
       allowNull: false,
       primaryKey: true,
       autoIncrement: true,
     },
     home_team: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'teams',
        key: 'id',
      },
    },
     home_team_goals: {
       allowNull: false,
       type: Sequelize.INTEGER,
     },
     away_team: {
       allowNull: false,
       type: Sequelize.INTEGER,
       onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'teams',
        key: 'id',
      },
     },
     away_team_goals: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    in_progress: {
      allowNull: false,
      type: Sequelize.DataTypes.BOOLEAN,
    },
   });
 },

 async down (queryInterface, _Sequelize) {
   await queryInterface.dropTable('matches');
 },
};