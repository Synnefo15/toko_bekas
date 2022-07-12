'use strict';
const { Model } = require('sequelize');
const { products } = require('.');
module.exports = (sequelize, DataTypes) => {
	class Products extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Products.belongsTo(models.Category, {
				foreignKey: 'id_category',
			});
			Products.hasMany(models.Transactions,{
				foreignKey:'id'
			});
			Products.belongsTo(models.Users,{
				foreignKey:'id_user'
			});
		}
	}
	Products.init(
		{
			id_user: DataTypes.INTEGER,
			id_category: DataTypes.INTEGER,
			product_name: DataTypes.STRING,
			product_description: DataTypes.STRING,
			price: DataTypes.INTEGER,
			product_image: DataTypes.STRING,
			stock:DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Products',
		}
	);
	return Products;
};
