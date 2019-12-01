const mongoose = require('mongoose');
const Users = require('../models/users');
const RandToken = require('rand-token');
const Kavenegar = require('kavenegar');
const kaveapi = require('../controller/kave');
const util = require('util');
Promise = global.Promise;




module.exports = {

    sendPinToUserViaSMS(req, res) {
        
        console.log('here i am')
        //think about more checks!!!
        req.checkBody('Number', 'this field cant be empty').notEmpty();
        req.checkBody('Number', 'this field should be only numbers').isInt();
        req.checkBody('Number', 'this field should be  eleven numbers').isLength(11);

        req.getValidationResult().then(function (result) {
            if (!result.isEmpty()) {
                res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
                return;
            } else {
                //define token and user number
                userNumber = req.body.Number
                //send pin to user via sms and save pin and user number to db

                let pin = RandToken.generate(5, '0987654321');

                        new Users({
                            phoneNumber: userNumber,
                            pin: pin}
                        ).save()



                    .then(() => {
                        new Promise((resolve) => {
                                resolve(kaveapi.Send({
                                    message: ' کد تایید شما ' + pin,
                                    sender: "10000011010011",
                                    receptor: userNumber
                                }))

                            })
                            .then(() => {
                                res.send('we just send to U a new pin please wait to recieve it')
                            })
                            .catch(() => {
                                res.send('pin sms problem')
                            })
                    }).catch(() => {})

                    .then(() => {
                        res.send('warning sms sended ')
                    })
                    .catch(() => {
                        res.send('there was problem we coudnt send warning sms')
                    })
            }
        })
    }
}