const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid,
        };

        jwt.sign(payload, process.env.JWT, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Token does not generated');
            } else {
                resolve(token);
            }
        });
    });
}


// const comprobarJWT = async(token = '') => {
//     try{
//         if(token.length < 10){
//             return null;
//         }
        
//         const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

//         const usuario = await Usuario.findById(uid);

//         if(usuario){
//             if(usuario.estado){
//                 return usuario;
//             }
//             else{
//                 return null;
//             }
//         }
//         else{
//             return null;
//         }
//     }
//     catch(err){
//         return null;
//     }
// }



module.exports = {
    generateJWT,
    // comprobarJWT
}