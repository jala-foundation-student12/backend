const {response, request} = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req = request, res = response) => {
    
    const users = await User.find();

    res.json({
        users
    });
}

const createUser = async (req = request, res = response) => {
    
    const { email, password } = req.body;

    try{
        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.status(400).json({
                ok: false,
                msg: 'The email already exist'
            });
        }
        const user = new User(req.body);
        const salt = bcrypt.genSaltSync();

        // encrypt password
        user.password = bcrypt.hashSync(password, salt);
        console.log(user);

        // generate Token
        const token = await generateJWT(user._id);
        await user.save();

        console.log(user);
        return res.json({
            ok:true,
            user,
            token
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'inespected error... check it'
        });
    }
}

const updateUser = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, email, ...rest} = req.body;
    
    if(password){
        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync( password , salt);
    }

    const user = await User.findByIdAndUpdate(id, rest, {new:true});

    res.json({
        ok: true,
        user
    });
}

module.exports = {
    getUsers,
    createUser, 
    updateUser
}

