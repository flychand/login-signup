const jwt = require("jsonwebtoken");
const User = require('./../models/users');
require('dotenv').config()
//jwt secerate key
var jwt_security_token = process.env.JWT_KEY

module.exports = {
    checkUser:function(req,res, data){
         User.find(data, function (err, check_user) {
            
            if(check_user.length == 0){
                return "NOT_EXIST"
            }
            else{
                return res.json({
                    success: false,
                    message: 'User already exixt!'
                  })
                
            }
        })
    },
    /**
     * 
     * @param {token} req 
     * @param {*} res
     * validate the token  
     */
    validateToken: function(req,res) {
        if(!req.headers.hasOwnProperty("x-token") ||req.headers['x-token'].length == 0){
           //if token is not being send in headers 
            return res.json({
                success: false,
                message: 'Token is empty'
              })
        }
        var token = req.headers['x-token'] 
        jwt.verify(token, jwt_security_token, (err, decoded) => {
            if (err) {
                // if token is invalid (expire or tempered)
                return res.json({
                  success: false,
                  message: 'Token is not valid'
                })
            }
            else {
                return "VALID"
              }
        })
    },
/**
 * 
 * @param {*} req 
 * @param {*} res
 * @description : decode the token and fetch encoded data and return 
 */
    decodeToken: function(req, res){
        // decoding token and returning decoded data
        var token = req.headers['x-token']
        var decode  = jwt.verify(token,jwt_security_token)
        return decode
    },
    /**
     * 
     * @param {*} req non
     * @param {*} res non
     * @param {*} data {email, _id}
     */
    createToken:function(req, res, data){
        //creating token
        var token = jwt.sign(data, jwt_security_token, { expiresIn: '1d' }); //token will expire in 1 day
        return token;
    }  
};


