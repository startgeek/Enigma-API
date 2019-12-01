const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const mongoose = require('mongoose');



module.exports = {
    postAtrip(req, res, next) {
        var userToken = req.body.token;

        if (userToken) {
            jwt.verify(userToken, process.env.jwtSECRET, function (err, decode) {

                    if (err) {
                        res.send('error in decoding token' + err);
                    }
                    if (decode) {
                        //console.log(req)
                        let userProvidedNumber = decode.user.phoneNumber;
                        console.log(userProvidedNumber);
                        console.log(req.body.trips)
                        

                        Users.findOneAndUpdate({
                                phoneNumber: userProvidedNumber
                            }, {
                                    $set: {
                                        trips: {
                                            SRCcoor: req.body.trips.SRCcoor,
                                            DSTcoor: req.body.trips.DSTcoor,
                                            SRCrange: req.body.trips.SRCrange,
                                            DSTrange: req.body.trips.DSTrange,
                                            TimeRange: req.body.trips.TimeRange,
                                            //Date: req.body.trips.Date,
                                            driver: req.body.trips.driver,
                                            passenger: req.body.trips.passenger,
                                            DesiireToTravelWithSameGender: req.body.trips.DesiireToTravelWithSameGender
                                        }
                                    }
                                
                            },
                            function (err, result) {
                                if (err) {
                                    return err;
                                }
                                if (result) {

                                    res.status(200).send('your trip saved successfuly we gonna find U a match');

                                }
                            }
                        )


                    } else {
                        res.status(500).send('token is not correct re login plz we log your IP dont mess with me');
                    }
                }



            )
        } else {
            res.status(401).send('token problem look mother fucker we logged your IP');
        }



    }

}