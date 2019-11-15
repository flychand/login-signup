const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * user's collection 
 */
let Users = new Schema({
    name: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    address : {
        type: String
    },
    phone : {
        type: String
    }
    
});


// Export the model
module.exports = mongoose.model('Users', Users);