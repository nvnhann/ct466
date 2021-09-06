
module.exports = function (app){
    const user = require('../controllers/user.controller');
    const verifySignup = require('../middleware/verifySignup');
    const authJwt = require('../middleware/authJWT')
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post('/api/user/signup',[verifySignup.checkDuplicateEmail], user.signup);
    app.post('/api/user/login', user.login);
    app.get('/api/user',[authJwt.verifyToken, authJwt.isAdmin])
}