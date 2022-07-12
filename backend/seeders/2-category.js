'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Categories', [
			{
				category: 'Elektronik',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				category: 'Transportasi',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				category: 'Pakaian',
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
