const { Router } = require('express');
const { check } = require('express-validator');
const { login, renovateToken } = require('../controllers/login');
const { fieldsValidate } = require('../middlewares/fields-validate');
const { validateJWT } = require('../middlewares/jwt-validate');

const router = Router();

router.post('/', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    fieldsValidate
], login);

router.get('/', [
    validateJWT
], renovateToken);

module.exports = router;