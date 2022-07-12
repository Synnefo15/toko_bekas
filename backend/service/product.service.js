const productRepository = require('../repository/products.repository.js');
const cloudinaryConfig = require('../config/cloudinary.config.js');
const { products } = require('../models/index.js');

exports.findAllProducts = async() => {
    return await productRepository.findAll();
};

exports.findProductById = async(id) => {
    return await productRepository.findById(id);
};

exports.createNewProduct = async(payload) => {
    try {
        const imageUpload = await cloudinaryConfig.uploader.upload(payload.files.product_image.path);

        const product = {
            id_user: payload.fields.id_user,
            id_category: payload.fields.id_category,
            product_name: payload.fields.product_name,
            product_description: payload.fields.product_description,
            price: payload.fields.price,
            product_image: imageUpload.secure_url
        }; 

        return await productRepository.save(product);
    } catch (err) {
        console.error(err);
    }
};

exports.updateProduct = async(payload, ids) => {
    try {
        const imageUpload = await cloudinaryConfig.uploader.upload(payload.files.product_image.path);

        const product = {
					id_user: payload.fields.id_user,
					id_category: payload.fields.id_category,
					product_name: payload.fields.product_name,
					product_description: payload.fields.product_description,
					price: payload.fields.price,
					product_image: imageUpload.secure_url
				};

        const productById = await productRepository.findById(ids);

        if (productById == null) {
            return null;
        } else {
            return await productRepository.update(product, ids);
        }
    } catch (err) {
        console.error(err);
    }
};

exports.deleteProduct = async(product) => {
    productRepository.delete(product);
};