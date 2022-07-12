const db = require('../models/index');
const Transaction = db.transactions;
const Product = db.products
const User = db.users

exports.findAll = async () => {
	return await Transaction.findAll({
		include: [
			{
				model: Product,
			},
			{
				model: User,
			}
		],
	});
};

exports.findById = async (id) => {
	return await Transaction.findByPk(id);
};

exports.save = async (trans) => {
	return await Transaction.create(trans);
};

exports.update = async (trans, ids) => {
	return await Transaction.update(trans, {
		where: { id: ids },
	});
};

exports.delete = async (trans) => {
	trans.destroy();
};
