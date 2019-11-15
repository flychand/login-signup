const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * Token collection for further uses
 */
let Tokens = new Schema({
    token: {
        type: String, 
        required: true
    },
    refresh_token: {
        type: String, 
    },
    email: {
        type: String, 
        required: true
    },
    userId:{
        type: String, 
        required: true
    }
    
});


// Export the model
module.exports = mongoose.model('Tokens', Tokens);