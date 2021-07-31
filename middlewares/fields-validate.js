const { validatorResult, validationResult } = require('express-validator');
const { response } = require('express');

const fieldsValidate = (req, res = response, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    next();
}

module.exports = {
    fieldsValidate
}


//snippet