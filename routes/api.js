const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const jwt = require('jsonwebtoken');

const env = require('dotenv').config();
const sendPinToUserViaSMS = require('../controller/sendPinToUserViaSMS');
const VPTC = require('../controller/VP&TC');
const askForLoginPinViaSMS = require('../controller/askForLoginPinViaSMS')
const matcher = require('../blackbox/tripmatcher');
const postAtrip = require('../controller/postAtrip');
const getAUser = require('../controller/getAUser');
const deleteAUser = require('../controller/deleteAUser');
                                  



                                    //SMS related stuff


//a user ask for a token kave sends a SMS
router.post('/register', sendPinToUserViaSMS.sendPinToUserViaSMS);

//verify pin and give user a cookie
//after fixing issue with update pin in db I should change buttom to retrieve pin from db

router.post('/VP&TC',VPTC.VPTC);


router.post('/askForNewPin', askForLoginPinViaSMS.askForLoginPinViaSMS);







//check for user token and return a user
router.get('/users/:id', getAUser.getAUser);



//delete a user
router.delete('/users/:id', deleteAUser.deleteAUser );

//TRIPSSSSSS


//get a trip from db
router.get('/trips/id', function (req, res, next) {

    res.send(matched);

});


//post a trip to api
router.post('/trip', postAtrip.postAtrip);

//update a trip
//its possible if its not accepted by any other yet
router.put('/trips/id', function (req, res, next) {

    res.send('updates a trip');
});


//delete a trip
//its possible if its not accepted by any other
router.delete('/trips/id', function (req, res, next) {

    res.send('delete a trip');
});



module.exports = router