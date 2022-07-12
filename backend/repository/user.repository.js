const db = require('../models/index.js');
const User = db.users

exports.findAll = async () => {
    return await User.findAll()
}

exports.findById = async (id) => {
    return await User.findByPk(id)
}

exports.save = async (user) => {
    return await User.create(user)
}

exports.update = async (user,ids) => {
    return await User.update(user,{
        where:{id:ids}
    })
}

exports.delete = async (user) => {
    user.destroy()
}