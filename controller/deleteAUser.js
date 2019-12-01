const jwt = require('jsonwebtoken');
const Users = require('../models/users');


module.exports = {

    deleteAUser(req, res, next) {
        var userToken = req.body.token;
        if (userToken) {
            jwt.verify(userToken, process.env.jwtSECRET, function (err, decode) {
    
                if (err) {
                    res.send('error in decoding token' + err);
                } else {
                
                    Users.findOneAndRemove({
                        phoneNumber: decode.user.phoneNumber
                    }, function (err, result) {
                        if (err) {
                            return err
                        } else {
                            res.status(200).send('user has been deleted successfuly');
                        }
                    })
    
                }
            })
    
        } else {
            res.status(500).send('no fucking token we log your IP mother fucker')
        }
    }


}