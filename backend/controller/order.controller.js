const orderService  = require('../service/order.service');

exports.createNewOrder = async (req,res) => {
    const order = await orderService.createNewOrder(req)
    res.status(201).json({data:order})
}