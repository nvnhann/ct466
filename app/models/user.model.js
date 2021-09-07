const sql = require('./db');
const bcrypt = require('bcryptjs');

const User = function (user){
    this.email = user.email;
    this.password = bcrypt.hashSync(user.password, 8);
};

User.create = (newUser, rs) =>{
    sql.query("INSERT INTO tai_khoan(email, mat_khau) VALUES (?,?)", [newUser.email, newUser.password], (err, _)=>{
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
    sql.query(`SELECT * FROM tai_khoan WHERE email = '${email}'`, (err, res)=>{
        if(err){
            console.log(err);
            return rs(err,null);
        }if(res.length){
            return rs(null, res[0]);
        }
        rs({kind: 'not_found'}, null);
    })
}

User.getRole = (email, res)=>{
    sql.query(`SELECT ROLE from tai_khoan where email = '${email}'`, (err, rs)=>{
        if(err){
            console.log('err: '+err);
            return res(err, null);
        }
        if(rs.length){
            return res(null, rs[0]);
        }
        res({kind: 'not_found'}, null);
    })
}


module.exports = User;