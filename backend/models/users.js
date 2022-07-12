'use strict';
const { Model } = require('sequelize');
const { products } = require('.');
module.exports = (sequelize, DataTypes) => {
	class Users extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Users.hasMany(models.Products,{
				foreignKey:'id'
			});
			Users.hasMany(models.Transactions,{
				foreignKey:'id'
			});
			Users.hasMany(models.Notifications,{
				foreignKey:'id'
			});
		}
	}
	Users.init(
		{
			role_name: DataTypes.STRING,
			email: DataTypes.STRING,
			user_name:DataTypes.STRING,
			password: DataTypes.STRING,
			hp: DataTypes.STRING,
			foto: DataTypes.STRING,
			alamat: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Users',
		}
	);
	return Users;
};
