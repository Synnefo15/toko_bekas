'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Notifications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER,
        references:{
          model:'Users',
          key:'id'
        }
        
      },
      notification: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    // await queryInterface.addConstraint('Notifications',{
    //   fields:['id_user'],
    //   type:'foreign key',
    //   name:'id_user-fkey',
    //   references:{
    //     table:'Users',
    //     field:'id'
    //   },
    //   onDelete:'cascade',
    //   onUpdate:'cascade'
    // })
    // await queryInterface.changeColumn('Notifications','id_user',{
    //   type:DataTypes.INTEGER
    // })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Notifications');
  }
};