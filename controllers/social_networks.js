const {response, request} = require('express');
const SocialNetworks = require('../models/social_networks');

const getSocialNetworks = async(req = request, res = response)=>{

    const socialNet = await SocialNetworks.find();

    res.json({
        socialNet
    });
}

const createSocialNetworks = async(req = request, res = response)=>{

    const { user } = req.body;

    try{
        const existingUser = await SocialNetworks.findOne({user});
        if(existingUser){
            return res.status(400).json({
                ok: false,
                msg: 'An user can not have multiple social networks'
            });
        }

        const socialNet = new SocialNetworks(req.body);
        await socialNet.save();

        console.log(socialNet);

        return res.json({
            ok:true,
            socialNet,
            //token
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'inespected error... check it'
        });
    }
}

const updateSocialNetwork = async (req = request, res = response)=>{
    const { id } = req.params;
    const { ...rest } = req.body;

    const socialNet = await SocialNetworks.findByIdAndUpdate(id, rest, {new:true});

    res.json({
        ok: true,
        socialNet
    });
}

const getSocialnetById = async(req = request, res = response)=>{

    const { id } = req.params;
    console.log(id);

    const socialnetById = await SocialNetworks.findOne({user:id});

    res.json({
        socialnetById
    });
}

module.exports = {
    getSocialNetworks,
    createSocialNetworks,
    updateSocialNetwork,
    getSocialnetById
}
