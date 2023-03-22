const { Schema, model } = require('mongoose');

const UserSchema = Schema({
	email: {
		require: true,
		type: String,
		unique: true,
	},
	name: {
		require: true,
		type: String,
	},
	password: {
		require: true,
		type: String,
	}
});

module.exports = model('User', UserSchema);
