'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Notifications', [
			{
				id_user: 1,
				notification: 'Notif 1',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id_user: 2,
				notification: 'Notif 2',
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
