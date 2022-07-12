const db = require('../models/index.js');
const Product = db.products;
const Category = db.category;
const User = db.users

exports.findAll = async () => {
	return await Product.findAll({
		include: [
			{
				model: Category,
				attributes:['category']
			},
			{
				model: User,
				attributes:['email','role_name']
			}
		],
	});
};

exports.findById = async (id) => {
	return await Product.findByPk(id);
};

exports.save = async (product) => {
	return await Product.create(product);
};

exports.update = async (product, ids) => {
	return await Product.update(product, { where: { id: ids } });
};

exports.delete = async (product) => {
	product.destroy();
};
