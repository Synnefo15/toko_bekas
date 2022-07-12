'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Transactions extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Transactions.belongsTo(models.Products,{
				foreignKey:'id_product'
			});
			Transactions.belongsTo(models.Users,{
				foreignKey:'id_user'
			});
		}
	}
	Transactions.init(
		{
			id_user: DataTypes.INTEGER,
			id_product: DataTypes.INTEGER,
			order_date: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: 'Transactions',
		}
	);
	return Transactions;
};
