const jwt = require('jsonwebtoken');
const Users = require('../models/users');


module.exports = {


    VPTC(req, res) {


        let userpin = req.body.mypin;
        let userNumber = req.body.Number;



        Users.findOne({
            phoneNumber: userNumber
        }, (err, user) => {
            if (err) {
                return err
            }
            if (user) {
                thisNumberPin = user.pin;


                if (userpin !== thisNumberPin) {
                    res.sendStatus(403);


                } else {
                    let token = jwt.sign({
                        user
                    }, process.env.jwtSECRET);

                    Users.findOneAndUpdate({
                                phoneNumber: user.phoneNumber
                            }, {
                                token: token
                            }
                        )
                        .then(() => {

                            res.json({

                                token: token,

                            })

                        })

                        .catch((err) => err)



                }


            }
        });



    }
}