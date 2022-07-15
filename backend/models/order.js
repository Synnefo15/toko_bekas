'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Order extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Order.init(
		{
			orderItems: DataTypes.STRING,
			shippingAddress: DataTypes.STRING,
			paymentMethod: DataTypes.STRING,
			itemsPrice: DataTypes.INTEGER,
			ShippingPrice: DataTypes.INTEGER,
			taxPrice: DataTypes.INTEGER,
			totalPrice: DataTypes.INTEGER,
			user: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Order',
		}
	);
	return Order;
};
