const jwt = require('jsonwebtoken');

const generateJWT = ( name, uid ) => {

	return new Promise((resolve, reject)=>{
		const payload = { name, uid };
		jwt.sign( payload, process.env.SECRET_JWT_SEED, {
			expiresIn: '2h',
		}, ( err, token )=> {
            
			if ( err ){
				console.log(err);
				reject('Failed to generate token');
			}

			resolve( token );
		});
	});

};

module.exports = {
	generateJWT,
};
