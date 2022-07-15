const db = require('../models/index');
const Order = db.order;

exports.save = async (order) => {
	return await Order.create(order);
};
