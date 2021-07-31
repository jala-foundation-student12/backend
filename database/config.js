
const mongoose = require('mongoose');
 
const dbConnection = async() => {
    try {
        await mongoose.connect('mongodb://localhost/devtest', {useNewUrlParser: true});
        console.log('Conectado');
    } catch (error) {
        console.log('error: ',error);
    }
}
 
module.exports = {dbConnection}