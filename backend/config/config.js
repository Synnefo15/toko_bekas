const dotenv = require('dotenv')
dotenv.config()
const {
	DB_USERNAME_P,
	DB_PASSWORD_P,
	DB_DATABASE_P,
	DB_HOST_P,
	DB_USERNAME_D,
	DB_PASSWORD_D,
	DB_DATABASE_D,
} = process.env;

module.exports = {
	development: {
		username: DB_USERNAME_D,
		password: DB_PASSWORD_D,
		database: DB_DATABASE_D,
		host: '127.0.0.1',
		dialect: 'postgres',
	},
	test: {
		username: 'root',
		password: null,
		database: 'database_test',
		host: '127.0.0.1',
		dialect: 'mysql',
	},
	production: {
		username: DB_USERNAME_P,
		password: DB_PASSWORD_P,
		database: DB_DATABASE_P,
		host: DB_HOST_P,
		dialect: 'postgres',
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
};
