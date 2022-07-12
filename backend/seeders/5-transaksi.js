'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Transactions', [
			{
				id_user: 1,
				id_product: 3,
				order_date: new Date(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id_user: 2,
				id_product: 4,
				order_date: new Date(),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
