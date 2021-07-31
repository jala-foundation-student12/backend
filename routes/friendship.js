const { Router } = require('express');
const { check } = require('express-validator');
const { getFriendship, createFriendship, updateFriendship, getRequestById, getFriends } = require('../controllers/friendship');
const { fieldsValidate } = require('../middlewares/fields-validate');
const router = Router();

router.get('/', getFriendship);
router.post('/', [
    check('receiver', "user receiver must be valid").isMongoId(),
    check('sender', "user sender must be valid").isMongoId(),
    fieldsValidate
], createFriendship);
router.put('/:id', updateFriendship);
router.get('/:id', getRequestById);
router.get('/friends/:id', getFriends);

module.exports = router;
