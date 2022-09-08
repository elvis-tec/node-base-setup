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

        if( user ){
            return res.status(400).json({
                ok: false,
                msg: 'User already exist',
            })
        }

        //Encrypt pwd
        user = new User( req.body );
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
        
        await user.save();
        
        //Generate JWT
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator',
        });
    }
}

const loginUser = async (req, res = response)=> {
    const { email, password } = req.body;
    try {

        let user = await User.findOne({
            email
        });
        
        if( !user ){
            return res.status(400).json({
                ok: false,
                msg: 'User or password not valid',
            })
        }

        //Validate pwd
        const validPassword = bcrypt.compareSync( password, user.password );

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'User or password not valid',
            })
        }

        //Generate JWT
        const token = await generateJWT(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator',
        });
    }
}

const renewToken = async(req, res = response)=> {
    const { name, uid } = req.body;
    
    //Generate new JWT
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        msg: 'renew',
        token
    })
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}