const transaksiRepository = require('../repository/transaksi.repository');

const { transaksi } = require('../models/index');

exports.findAllTrans = async () => {
	return await transaksiRepository.findAll();
};

exports.findTransById = async (id) => {
	return await transaksiRepository.findById(id);
};

exports.createNewTrans = async (payload) => {
	try {
		const orderDate = await new Date()
		// const day = await orderDate.getUTCDate();
		// const month = await orderDate.getUTCMonth() + 1;
		// const year = await orderDate.getUTCFullYear();
		const trans = {
			id_user: payload.fields.id_user,
			id_product: payload.fields.id_product,
			// order_date: payload.fields.order_date,
			order_date: orderDate,
		};
		return await transaksiRepository.save(trans);
	} catch (error) {
		console.log(error);
	}
};

exports.updateTrans = async (payload, ids) => {
	try {
		const orderDate = new Date();
		// const day = orderDate.getUTCDate();
		// const month = orderDate.getUTCMonth() + 1;
		// const year = orderDate.getUTCFullYear();
		const trans = {
			id_user: payload.fields.id_user,
			id_product: payload.fields.id_product,
			order_date: orderDate,
		};

        const transById = await transaksiRepository.findById(ids)

        if (transById == null) {
            return null 
        } else {
            return await transaksiRepository.update(trans,ids)
        }
	} catch (error) {
        console.log(error);
    }
};

exports.deleteTrans = async (trans) => {
    transaksiRepository.delete(trans)
}
