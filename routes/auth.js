/*
Auth route
host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, renewToken, loginUser } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();



router.post('/', [
	check('email', 'required').isEmail(),
	check('password', 'required and more than 6 characters').isLength({ min: 6 }),
	validateFields
],loginUser);

router.post('/new', [
	//middlewares
	check('name', 'required').not().isEmpty(),
	check('email', 'required').isEmail(),
	check('password', 'required and more than 6 characters').isLength({ min: 6 }),
	validateFields,
], createUser);

router.get('/renew', validateJWT,renewToken);

module.exports = router;
