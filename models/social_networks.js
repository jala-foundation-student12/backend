'use strict';

const { Schema, model } = require('mongoose');

const SocialNetworksSchema = new Schema({
    
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    facebook: {
        type: String,
        require: true
    },
    twitter: {
        type: String,
        require: false
    },
    whatsapp: {
        type: String,
        require: false
    },
    instagram: {
        type: String,
        require: false
    },
    snapchat: {
        type: String,
        require: false
    }   
});

SocialNetworksSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('SocialNetwork', SocialNetworksSchema);