const productService = require('../service/product.service.js');

exports.findAllProductsApi = async(request, response) => {
    const products = await productService.findAllProducts();

    response.json({ data: products });
};

exports.findProductByIdApi = async(request, response) => {
    const product = await productService.findProductById(request.params.id);

    if (product != null) {
        response.json({ data: product });
    } else {
        response.status(404).json({ error: `Product not found with id ${request.params.id}` });
    }
};

exports.createNewProductApi = async(request, response) => {
    const product = await productService.createNewProduct(request);

    response.status(201).json({ data: product });
};

exports.updateProductApi = async(request, response) => {
    const product = await productService.updateProduct(request, request.params.id);

    if (product == null) {
        response.status(404).json({ error: `Product not found with ids : ${request.params.id}` });
    } else {
        response.json({ message: "Updated successfully" });
    }
};

exports.deleteProduct = async(request, response) => {
    const productById = await productService.findProductById(request.params.id);

    if (productById == null) {
        response.status(404).json({ error: `Product not found with ids : ${request.params.id}` });
    } else {
        productService.deleteProduct(productById);
        response.json({ message: "Deleted successfully" });
    }
};