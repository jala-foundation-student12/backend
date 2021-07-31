const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, createUser, updateUser } = require('../controllers/users');
const { fieldsValidate } = require('../middlewares/fields-validate');
const { validateJWT } = require('../middlewares/jwt-validate');
const router = Router();

router.get('/', getUsers);
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('lastname', 'Lastname is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    fieldsValidate
] ,createUser);
router.put('/:id', validateJWT ,updateUser);

module.exports = router;

