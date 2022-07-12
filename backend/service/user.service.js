const userRepository = require('../repository/user.repository');
const cloudinaryConfig = require('../config/cloudinary.config');

const { user } = require('../models/index.js');

exports.findAllUsers = async () => {
	return await userRepository.findAll();
};

exports.findUserById = async (id) => {
	return await userRepository.findById(id);
};

exports.createNewUser = async (payload) => {
	try {
		const uploadFoto = await cloudinaryConfig.uploader.upload(payload.files.foto.path)
		
		const user = {
			role_name: payload.fields.role_name,
			email: payload.fields.email,
			password: payload.fields.password,
			user_name:payload.fields.user_name,
			hp: payload.fields.hp,
			foto:uploadFoto.secure_url,
			alamat: payload.fields.alamat,
		};
		return await userRepository.save(user)
	} catch (err) {
		console.log(err);
	}
}

exports.updateUser = async (payload,ids) => {
	try {
		const uploadFoto = await cloudinaryConfig.uploader.upload(payload.files.foto.path)
		
		const user = {
			role_name: payload.fields.role_name,
			email: payload.fields.email,
			user_name: payload.fields.user_name,
			password: payload.fields.password,
			hp: payload.fields.hp,
			foto: uploadFoto.secure_url,
			alamat: payload.fields.alamat,
		};

		const userById = await userRepository.findById(ids)

		if (userById == null) {
			return null
		} else {
			return await userRepository.update(user,ids)
		}
		
	} catch (error) {
		console.log(error);
	}
}

exports.deleteUser = async (user) => {
	userRepository.delete(user)
}