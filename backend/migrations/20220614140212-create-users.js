'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			role_name: {
				type: Sequelize.STRING,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			// user_name:{
			// 	type:Sequelize.STRING,

			// },
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			hp: {
				type: Sequelize.STRING,
			},
			foto: {
				type: Sequelize.STRING,
			},
			alamat: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Users');
	},
};
