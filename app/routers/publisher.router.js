const authjwt = require("../middleware/authJWT");
const publisher = require("../controllers/publisher.controller");
module.exports = function (app){
    const publisher = require('../controllers/publisher.controller');
    const authjwt = require('../middleware/authJWT');
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post('/api/publisher',[authjwt.verifyToken,authjwt.isAdmin], publisher.create);
    app.get('/api/publisher',[authjwt.verifyToken,authjwt.isAdmin], publisher.getAll);
}