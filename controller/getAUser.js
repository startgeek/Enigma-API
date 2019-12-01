const jwt = require('jsonwebtoken');
const Users = require('../models/users');

module.exports = {

    getAUser(req, res, next) {
        var userToken = req.headers.token;
        if (userToken) {
            jwt.verify(userToken, process.env.jwtSECRET, function (err, decode) {
    
                if (err) {
                    res.send('error in decoding token' + err);
                } else {
                    console.log(decode);
                    Users.findOne({
                        phoneNumber: decode.user.phoneNumber
                    }, function (err, result) {
                        if (err) {
                            return err
                        } else {
                            res.status(200).send('success heres your infos and trips we worked so hard to bring you new matches' + result);
                        }
                    })
    
                }
            })
    
        } else {
            res.status(500).send('no fucking token we log your IP mother fucker')
        }
    }
}