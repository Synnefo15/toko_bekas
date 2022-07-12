'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Users', [
			{
				id: 1,
				role_name: 'seller',
				email: 'rafi@email.com',
				user_name: 'rafi cahya',
				password: 'rafi123',
				hp: '081728930617',
				foto: 'gambar1.jpg',
				alamat: 'probolinggo',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				role_name: 'buyer',
				email: 'raka@email.com',
				user_name: 'raka satura',
				password: 'raka123',
				hp: '0812349028192',
				foto: 'gambar1.jpg',
				alamat: 'lumajang',
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
