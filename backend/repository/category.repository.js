const db = require('../models/index.js');
const Category = db.category;

exports.findAll = async() => {
    return await Category.findAll();
}; 

exports.findById = async(id) => {
    return await Category.findByPk(id);
};

exports.save = async(category) => {
    return await Category.create(category);
};

exports.update = async(category, ids) => {
    return await Category.update(category, { where: { id: ids } })
};

exports.delete = async(category) => {
    category.destroy();
};