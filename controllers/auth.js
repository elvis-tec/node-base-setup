const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async(req, res = response)=> {
	const { email, password } = req.body;

	try {
		let user = await User.findOne({
			email
		});

		if ( user ){
			return res.status(400).json({
				msg: 'User already exist',
				ok: false,
			});
		}

		//Encrypt pwd
		user = new User( req.body );
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync( password, salt );
        
		await user.save();
        
		//Generate JWT
		const token = await generateJWT(user.id, user.name);

		res.status(201).json({
			name: user.name,
			ok: true,
			token,
			uid: user.id,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Please talk to the administrator',
			ok: false,
		});
	}
};

const loginUser = async (req, res = response)=> {
	const { email, password } = req.body;

	try {

		let user = await User.findOne({
			email
		});
        
		if ( !user ){
			return res.status(400).json({
				msg: 'User or password not valid',
				ok: false,
			});
		}

		//Validate pwd
		const validPassword = bcrypt.compareSync( password, user.password );

		if ( !validPassword ){
			return res.status(400).json({
				msg: 'User or password not valid',
				ok: false,
			});
		}

		//Generate JWT
		const token = await generateJWT(user.id, user.name);

		res.json({
			name: user.name,
			ok: true,
			token,
			uid: user.id,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: 'Please talk to the administrator',
			ok: false,
		});
	}
};

const renewToken = async(req, res = response)=> {
	const { name, uid } = req.body;
    
	//Generate new JWT
	const token = await generateJWT(uid, name);

	res.json({
		msg: 'renew',
		ok: true,
		token
	});
};

module.exports = {
	createUser,
	loginUser,
	renewToken
};
