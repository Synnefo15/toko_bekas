const categoryService = require('../service/category.service.js');

exports.findAllCategoryApi = async(request, response) => {
    const categorys = await categoryService.findAllCategory();

    response.json({ data: categorys });
};

exports.findCategoryByIdApi = async(request, response) => {
    const category = await categoryService.findCategoryById(request.params.id);

    if (category != null) {
        response.json({ data: category });
    } else {
        response.status(404).json({ error: `Category not found with id ${request.params.id}` });
    }
};

exports.createNewCategoryApi = async(request, response) => {
    const category = await categoryService.createNewCategory(request);

    response.status(201).json({ data: category });
};

exports.updateCategoryApi = async(request, response) => {
    const category = await categoryService.updateCategory(request, request.params.id);

    if (category == null) {
        response.status(404).json({ error: `Category not found with ids : ${request.params.id}` });
    } else {
        response.json({ message: "Updated successfully" });
    }
};

exports.deleteCategory = async(request, response) => {
    const categoryById = await categoryService.findCategoryById(request.params.id);

    if (categoryById == null) {
        response.status(404).json({ error: `Category not found with ids : ${request.params.id}` });
    } else {
        categoryService.deleteCategory(categoryById);
        response.json({ message: "Deleted successfully" });
    }
};