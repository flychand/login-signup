const User = require('./../models/users');
const Token = require('./../models/token');
const jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");
var lodash = require('lodash');
require('dotenv').config()

const commonUser = require('./../common/commonUser')

/**
 * Request body : {name : "xxxxx", email: "xxxx@gmail.com", "password": "xxxxxxx"}
 * Response : {email : email , token: jwt_token},
 * step1: Take email and check whether email is already exist or not, if exist return error.
 * step2: If not, encode password, and take all data and dump to db
 * step3 :Take _id (mongoId -> userId), email and create token with JWT,
 * step4 :Store token with email, userId to db for further uses.
 * step5 :Retun token with email  
 * note : I know sort term data should be kept in db , redis is best for this.because of time constraints i didn't use .
 * 
 */
exports.signup = function(req,res){
    let body = req.body;
    if (!req.body.email || !req.body.password) {
        res.status(400).send("Error. Please enter the correct username and password");
    }
    else{
        User.find({email : body.email}, function (err, check_user) {
            if(check_user.length !== 0){
                res.status(400).send({error: " email already exist!"});
            } else {
                
                var ciphertext = CryptoJS.HmacSHA1(body.password, "assignmentkey");
                var password = ciphertext.toString();
                var payload = {
                    name : body.username,
                    email : body.email,
                    password : password,
                }
                User.create(payload, function (err, response) {
                    if (err) return handleError(err);
                    
                    var data = {
                        email : body.email,
                        userId : response._id,
                    }
                    var token = commonUser.createToken(req,res,data)
                    
                    var token_payload = {
                        userId : response._id,
                        email : body.email,
                        token : token
                    }
                    Token.create(token_payload, function(err ,tokenResponse) {
                        if (err) return handleError(err);
                        var resp = {
                            email : tokenResponse.email,
                            token : token
                        }
                        res.send({message : "user registered successfully", data:resp})
                    })
                })
            }
        })
    }
}

/**
 * Request body : {email : email, password : password}
 * Response : {email : email, token : jwt_token}
 * step1 :Take email and check wheather email exist in db or not, if not return error
 * step2 :Take given password create hash password and query with email and hash password to db
 * step3 :If not match give error, If match then create jwt_token and return email and jwt_token   
 * note : Before login we should verify user. again time issue
 */

exports.login = function(req,res){
    let body = req.body;
    if (!req.body.email || !req.body.password) {
        res.status(400).send({error : "Please enter the correct username and password"});
    }
    else {

        User.find({email : body.email}, function (err, check_user) {
            if(check_user.length == 0){
               res.send({message: "invalid email please check your email", error : "Invaild email"})
            } else {
                var ciphertext = CryptoJS.HmacSHA1(body.password, "assignmentkey");
                var password = ciphertext.toString();
    
                var find_user = {
                    email : body.email,
                    password : password
                }
                User.find(find_user, function (err, result) {
                    if (err) return handleError(err);
                    var data = {
                        email : result[0].email,
                        userId : result[0]._id,
                    }
                    var token = jwt.sign(data, "jwtSecreteKey", { expiresIn: '1d' });
                    var resp = {
                        email : result.email,
                        token : token
                    }
                    res.send({message : "user logedin successfully!", data : resp})
                });
            }
        })  
    }
}
/**
 * Request header : {x-token : jwt_token } , which you got while login
 * Response : All stored data, 
 * 
 */

exports.profile = function(req,res){
    var data = commonUser.validateToken(req,res)
    var decodeData  = commonUser.decodeToken(req,res)
    var decode  = decodeData
    var find_user = {
        email : decode.email
    }

    User.find(find_user, function (err, result) {
        if (err) return handleError(err);
        
        if(result.length !=0){
            var userData = result[0]; 
            // cleaning the response with lodash
            var resp = lodash.pick(userData, ['_id','name', 'email']);
            
            res.send({message : "user fetched successfully!", data: resp})
        }
    })
}

/**
 * Request body : Data which need to update,and token in header {x-token : jwt_token}
 * Response :  Any message by saying that your data is updated succesfully.
 * note: I am no validating any request which is coming from client
 */
exports.update_profile = async function(req,res){
    
    var data = commonUser.validateToken(req,res)
    var decodeData  = commonUser.decodeToken(req,res)
    var decode  = decodeData
    
    var find_user = {
        email : decode.email
    }
    User.find(find_user, function (err, result) {
        var data = req.body
        
        delete data["password"]
        delete data["email"]
        delete data["_id"]
        if (err) return handleError(err);
        
        if(result.length !=0){
            User.updateOne(find_user, data, function(err, resp) {
                res.send({message : "user updated successfully!", data:resp})
              });
        }
    })
}