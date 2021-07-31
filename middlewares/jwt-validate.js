const jwt = require('jsonwebtoken');
const User = require('../models/user');
// const Usuario = require('../models/usuario');

const validateJWT = async (req, res, next) => {
    //Leer el Token
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'There is not token on petition'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT);
        
        const user = await User.findById(uid);

        // Verificar que el usuario este en la BD
        if(!user){
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en DB '
            })
        }

        req.user = user;
        // console.log('jwt', user);
        req.uid = uid;
        next();


    } catch (error) {

        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }

}

module.exports = {
    validateJWT
}

//snippet