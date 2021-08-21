const sql = require('./db');
const bcrypt = require('bcryptjs');

const User = function (user){
    this.email = user.email;
    this.password = bcrypt.hashSync(user.password, 8);
};

User.create = (newUser, rs) =>{
    sql.query("INSERT INTO accounts(email, password) VALUES (?,?)", [newUser.email, newUser.password], (err, _)=>{
        if(err) {
            console.log(err);
            return rs(err, null);

        } else {
         //   console.log('Create user: ', {...newUser});
            rs(null, {...newUser})
        }
    })
}
User.findEmail = (email, rs) =>{
    sql.query(`SELECT * FROM accounts WHERE email = '${email}'`, (err, res)=>{
        if(err){
            console.log(err);
            return rs(err,null);
        }if(res.length){
            return rs(null, res[0]);
        }
        rs({kind: 'not_found'}, null);
    })
}


module.exports = User;