const  jwt = require('jsonwebtoken');
const config = require("../config/auth.config");
const  User = require("../models/user.model");

verifyToken = (req, res, next) =>{
    let token = req.headers['x-access-token'];
    if(!token){
        return res.status(403).send({
            message: "No token provided!"
        })
    }

    jwt.verify(token, config.secret, (err, decoded)=>{
        if(err){
            return res.status(401).send({
                message: 'Unauthorized!'
            })
        }
        req.email = decoded.email;
        next();
    })
}

isAdmin = (req, res, next) =>{
    User.getRole(req.email, (err, rs)=>{
        if(err) {
            return res.status(401).send({message: 'some err' + err})
        }
        if(rs.ROLE === 'ADMIN'){
            return next();
        } else {
            return res.status(403).send({message: 'Require Admin Role'})
        }
    })
}


const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
}

module.exports = authJwt;