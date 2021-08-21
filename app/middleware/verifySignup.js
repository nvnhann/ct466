const User = require('../models/user.model');

const checkDuplicateEmail = (req, res, next)=>{
    User.findEmail(req.body.email, (err, email)=>{
        console.log('email: '+email)
        if(!!email){
          return res.status(400).send({message: 'Email đã tồn tại!'});
        } next();
    })
}

const verifySignup = {
    checkDuplicateEmail : checkDuplicateEmail
};

module.exports = verifySignup;