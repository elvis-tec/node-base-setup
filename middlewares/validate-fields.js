const { response } = require('express');
const { validationResult } = require('express-validator');

const validateFields = ( req, res =  response, next )=>{
	//Errors express
	const errors = validationResult( req );

	if ( !errors.isEmpty() ){
		return res.status(400).json({
			errors: errors.mapped(),
			ok: false,
		});
	}
	next();
};

module.exports = {
	validateFields,
};
