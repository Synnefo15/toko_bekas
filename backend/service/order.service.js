const orderRepository = require('../repository/order.repository.js');

exports.createNewOrder = async (payload) => {
    try {
        const order = {
					orderItems: payload.fields.orderItems,
					shippingAddress: JSON.stringify(payload.fields.shippingAddress),
					paymentMethod: payload.fields.paymentMethod,
					itemsPrice: payload.fields.itemsPrice,
					ShippingPrice: payload.fields.ShippingPrice,
					taxPrice: payload.fields.taxPrice,
					totalPrice: payload.fields.totalPrice,
					user: JSON.stringify(payload.fields.user),
				};
				console.log(order);

                return await orderRepository.save(order)
    } catch (err) {
        console.error(err)
    }
}