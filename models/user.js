'use strict';

const { Schema, model } = require('mongoose');

const UserSchema = Schema({

        name: {
            type: String,
            require: true
        },
        lastname: {
            type: String,
            require: true
        },
        email: {
            type: String,
            unique: true
        },
        birthdate: {
            type: String, 
            require: false
        },
        telnumber: {
            type: String,
            require: false
        },
        password: {
            type: String,
            require: true
        },
        school: {
            type: String,
            require: false
        },
        university: {
            type: String,
            require: false
        },
        job: {
            type: String,
            require: false
        },
        address: {
            type: String,
            require: false
        }
});

UserSchema.method('toJSON', function(){
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('User', UserSchema);
