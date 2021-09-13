const Publisher = require('../models/publisher.model');

exports.create = (req, res)=>{
    const publisher = new Publisher({
        name: req.body.name
    });

    Publisher.create(publisher, (err,data)=>{
        if(err){
            console.log(err);
            return res.status(500).send({message: err})
        }
        res.send({
            message: 'Thành công'
        })
    })
}
exports.getAll = (req,res)=>{
    Publisher.getAll((err,data)=>{
        if(err){
            console.log(err);
           return res.status(500).send({message: err});
        }
        res.send({data})
    })
}