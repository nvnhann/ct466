const User = require('../models/user.model');
const config = require('../config/auth.config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = (req, res) =>{
    if (!req.body) {
        res.status(400).send({
            message: 'content can not be empty',
        });
    }
    const user = new User({
        email: req.body.email,
        password: req.body.password,
    });

    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        else {
            const token = jwt.sign({email: data.email}, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            res.send({
                USER: {
                    email: data.email,
                    role: 'USER',
                },
                accessToken: token
            });
        }
    });
}

exports.login = (req, res) =>{
    User.findEmail(req.body.email, (err,data)=>{
        if(err){
            return res.status(404).send({message: 'Email không tồn tại!'})
        }
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            data.password
        );
        if(!passwordIsValid){
            return res.status(401).send({
                message: 'Mật khẩu không chính xác!',
                accessToken: null
            })
        }
        const token = jwt.sign({email: data.email}, config.secret, {
            expiresIn: 86400 // 24 hours
        });
        res.status(200).send({
            USER: {
                email: data.email,
                role: data.role
            },
            accessToken: token
        })
    })
}