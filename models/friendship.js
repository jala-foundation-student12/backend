'use strict';

const { Schema, model } = require('mongoose');

const friendshipSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    accepted: {
        type: Boolean,
        default: false
    },
    respond: {
        type: Boolean, 
        default: false
    },
    description: {
        type: String,
        required: false
    }
});

friendshipSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Friendship', friendshipSchema);