const authService = require('../service/auth.service.js');
const config = require('../config/auth.config');
const db = require('../models');
const User = db.users;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');


exports.signup = async (req, res) => {
	const user = await authService.signup(req);
	res.status(201).json({
		data: user,
	});
};

exports.signin = async (req, res) => {
	User.findOne({
		where: {
			email: req.fields.email,
		},
	}).then((user) => {
		if (!user) {
			return res.status(404).send({ message: 'User Not found.' });
		}
		var passwordIsValid = bcrypt.compareSync(req.fields.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send({
				accessToken: null,
				message: 'Invalid Password!',
			});
		}
		var token = jwt.sign({ id: user.id, role:user.role_name }, config.secret, {
			expiresIn: 86400, // 24 hours
		});
		res.status(200).send({
			id: user.id,
			email: user.email,
			accessToken: token,
		
		});
	});
};
