const categoryRepository = require('../repository/category.repository.js');
const { category } = require('../models/index.js');

exports.findAllCategory = async() => {
    return await categoryRepository.findAll();
};

exports.findCategoryById = async(id) => {
    return await categoryRepository.findById(id);
};

exports.createNewCategory = async(payload) => {
    try {
        const category = {
            category: payload.fields.category
        };

        return await categoryRepository.save(category);
    } catch (err) {
        console.error(err);
    }
};

exports.updateCategory = async(payload, ids) => {
    try {
        const category = {
            category: payload.fields.category
        };

        const categoryById = await categoryRepository.findById(ids);

        if (categoryById == null) {
            return null;
        } else {
            return await categoryRepository.update(category, ids);
        }
    } catch (err) {
        console.error(err);
    }
};

exports.deleteCategory = async(category) => {
    categoryRepository.delete(category);
};