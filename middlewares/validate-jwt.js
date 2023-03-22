const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next)=>{
	//x-token headers
	const token = req.header('x-token');
    
	if ( !token ){
		return res.status(401).json({
			msg: 'Token required',
			ok: false,
		});
	}

	try {
        
		const payload = jwt.verify(
			token,
			process.env.SECRET_JWT_SEED
		);
        
		req.body.uid = payload.uid;
		req.body.name = payload.name;
        
	} catch (error) {
		return res.status(401).json({
			msg: 'Token not valid',
			ok: false,
		});
	}

	next();
};

module.exports = {
	validateJWT,
};
