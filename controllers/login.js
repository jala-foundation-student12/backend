const response = require('express');
const User = require('../models/user');

const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {

    const {email, password} = req.body;
    
    try {

        //Verificar si el email existe
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg: 'user or password are not correct'
            })
        }

        //Verificar la contraseña
        const validatePassword = bcryptjs.compareSync(password, user.password);
        if(!validatePassword){
            return res.status(400).json({
                msg: 'user or password are not correct'
            })
        }

        console.log(user);
        //Generar el JWT
        const token = await generateJWT(user._id);

        res.json({
            user, 
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const renovateToken = async(req, res = response) =>{

    // console.log(req)
    const { user, uid } = req;
    // console.log(user);
    //Generar el JWT
    // console.log(user.uid)
    const token = await generateJWT(uid);
    
            
    res.json({
        user, 
        token
    });
}

module.exports = {
    login,
    renovateToken
}