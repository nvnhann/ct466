const sql = require('./db');

const Publisher = function (pulisher){
    this.name = pulisher.name;
}

Publisher.create = (newPublisher, rs)=>{
    sql.query("INSERT INTO nha_xuat_ban(tennxb) VALUES (?)", [newPublisher.name], (err, _)=>{
        if (err){
            console.log(err);
            return rs(err,null);
        }
        rs(null, {...newPublisher})
    })
}

Publisher.getAll = rs =>{
    sql.query("SELECT * FROM nha_xuat_ban", (err, data)=>{
        if(err){
            console.log(err);
            return rs(err,null);
        }
        rs(null,data)
    })
}

module.exports = Publisher;