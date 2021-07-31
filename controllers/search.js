const User = require('../models/user');


const search = async(req, res) =>{
    
    const {term} = req.params;

    const regex = new RegExp(term, 'i');
    const users = await User.find({
        $or: [{name: regex}, {lastname: regex},{email: regex}, {job: regex}, 
            {school: regex}, {university: regex}, {address: regex}]
    });

    res.json({
        users
    });

} 

module.exports = {
    search
}