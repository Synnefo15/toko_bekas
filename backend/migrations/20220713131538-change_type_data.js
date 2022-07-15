'use strict';

const dataTypes = require('sequelize/lib/data-types');
// const { DataTypes } = require("sequelize/types");

var DataTypes = require('sequelize/lib/data-types');

module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		await queryInterface.changeColumn('Orders', 'orderItems', {
			type: Sequelize.ARRAY(Sequelize.JSONB) + ' USING CAST("orderItems" as ' + Sequelize.ARRAY(Sequelize.JSONB)+')'
		});
		await queryInterface.changeColumn('Orders', 'shippingAddress', {
			type: Sequelize.JSONB + ' USING CAST("shippingAddress" as ' + Sequelize.JSONB + ')'
		});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.changeColumn('Orders', 'orderItems', {
			type: Sequelize.STRING + ' USING CAST("orderItems" as ' + Sequelize.STRING + ')',
		});
		await queryInterface.changeColumn('Orders', 'shippingAddress', {
			type: Sequelize.STRING + ' USING CAST("shippingAddress" as ' + Sequelize.STRING + ')',
		});
	},
};
