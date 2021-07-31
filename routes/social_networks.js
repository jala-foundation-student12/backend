const { Router } = require('express');
const { check } = require('express-validator');
const { getSocialNetworks, createSocialNetworks, updateSocialNetwork, getSocialnetById } = require('../controllers/social_networks');
const { fieldsValidate } = require('../middlewares/fields-validate');
const router = Router();

router.get('/', getSocialNetworks);
router.post('/', [
    check('user', "user must be valid").isMongoId(),
    fieldsValidate
], createSocialNetworks);
router.put('/:id', updateSocialNetwork);
router.get('/:id', getSocialnetById);

module.exports = router;