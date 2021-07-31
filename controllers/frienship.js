const {response, request} = require('express');
const friendship = require('../models/friendship');
const Friendship = require('../models/friendship');


const getFriendship = async (req = request, res = response) => {
    const friends = await Friendship.find();

    res.json({
        friends
    });
}

const createFrienship = async (req = request, res = response) => {
    try{
        const friendship = new Friendship(req.body);
        await friendship.save();

        return res.json({
            ok: true,
            friendship
        })
    }catch(err){
        console.log(err);

        return res.status(500).json({
            ok: false,
            msg: 'inespected error... check it'
        })
    }
}

const updateFriendship = async (req = request, res = response) => {
    
    const { id } = req.params;
    const { ...rest } = req.body
    friends = await Friendship.findByIdAndUpdate(id, rest, {new:true});

    res.json({
        friends
    });
}

const getRequestById = async(req = request, res = response)=>{

    const { id } = req.params;
    console.log(id);

    const getrequest = await Friendship.find({receiver:id})
        .populate('sender', 'name lastname');

        res.json({
            getrequest
        });
}

const getFriends = async(req = request, res = response)=>{

    const { id } = req.params;
    // console.log(id);

    const getfriends = await Friendship.find({
        $or: [{receiver: id}, {sender: id}],
        $and: [{accepted: true}]
    }).populate('sender', 'name lastname').populate('receiver', 'name lastname')

    res.json({
        getrequest
    });
}

module.exports = {
    getFriendship,
    createFrienship,
    updateFriendship,
    getRequestById,
    getFriends
}

