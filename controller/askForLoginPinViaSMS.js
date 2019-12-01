const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const RandToken = require('rand-token');
const Kavenegar = require('kavenegar');
const kaveapi = require('./kave');
const mongoose = require('mongoose');
const util = require('util');

mongoose.Promise = global.Promise;

// let token = jwt.sign({
//     Users
// }, process.env.jwtSECRET);


module.exports = {
    askForLoginPinViaSMS(req, res) {
        let userNumber = req.body.Number;
        req.checkBody('Number', 'this field cant be empty').notEmpty();
        req.checkBody('Number', 'this field should be only numbers').isInt();
        req.checkBody('Number', 'this field should be  eleven numbers').isLength(11);
        req.getValidationResult().then(function (result) {
                if (!result.isEmpty()) {
                    res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
                    return;
                } else {
                    let pin = RandToken.generate(5, '0987654321');
                    Users.findOneAndUpdate({
                            phoneNumber: userNumber
                        }, {
                            pin: pin
                        }, (err, doc) =>
                    {
                            if (!doc) {
                                res.send('we dont have your number in our db');
                                console.log(err);
                            } else {
                                kaveapi.Send({
                                    message: ' کد تایید شما ' + pin,
                                    sender: "10000011010011",
                                    receptor: userNumber
                                }, () => {
                                    res.send('we send a pin to u');
                                })
                            }
                        })
                }
            }
        )
    }
}