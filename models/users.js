const mongoose = require('mongoose');
const GeoJSON = require('mongoose-geojson-schema');
const validate = require('mongoose-validator');
const Schema = mongoose.Schema;


//define all kind of validators to validate eery parameters going to db and in case of err 
//return a desirable response


//its not working correctly fix it llater

// var phoneNumValidator = [
//   validate({
//     validator: 'isLength',
//     arguments: [11, 11],
//     message: 'Number should be exacly eleven digits'
//   }),
//   validate({
//     validator: 'isNumeric',
//     passIfEmpty: false,
//     message: 'Name should contain alpha-numeric characters only'
//   })
// ];

//here's we going to add all kind of diffrent validators every thing should be checked befor goes to db
//we dont trust front end it could get hacked easily

//create user schema & model
const SRCtrip = new Schema({
    type:{
        type: String,
        default: "Point"
    },
    coordinates:{
        type:[Number],
        index:"2dsphere"
    }
});

const DSTtrip = new Schema({
   type:{
       type: String,
       default: "Point"
   },
   coordinates:{
       type:[Number],
       index:"2dsphere"
   }
});

const UserSchema = new Schema({


    name: {
        type: String,
        //required: [true, 'Name field is required']
    },
    familyName: {
        type: String,
        //required: [true, 'familyName is required']
    },
    fathersName: {
        type: String,
        required: [false]
    },
    male: {
        type: Boolean,
        //required:[true, 'should specify your gender']
    },
    //TRIP

    trips: [{
        SRCcoor: SRCtrip,
        DSTcoor: DSTtrip,
        SRCrange: Number,
        DSTrange: Number,
        TimeRange: Number,
        Date: Date,
        driver: Boolean,
        passenger: Boolean,
        DesiireToTravelWithSameGender: Boolean
    }],


    phoneNumber: {
        type: Number,
        unique: [true,'this number is already has an account use sign in ']
    },
    pin: String,
    token: String,
    homeTown: String,
    address: String,
    dataOfBirth: Date,
    dataOfRegister: Date,
    IDNumber: String,
    carType: String,
    carDescription: String,
    isDriver: Boolean,
    isPassenger: Boolean,
    stars: Number,
    extraDescription: String,
    documentProvided: String,
    wellKnownPassenger: Boolean,
    wellKnownDriver: Boolean,
    isSmoker: Boolean,
    document1RefrenceNumber: Number,
    document2RefrenceNumber: Number,
    document3RefrenceNumber: Number,
    document4RefrenceNumber: Number,
    document5RefrenceNumber: Number,
    document6RefrenceNumber: Number,
    document7RefrenceNumber: Number,
    document8RefrenceNumber: Number,
    document9RefrenceNumber: Number,
    document10RefrenceNumber: Number,
    document11RefrenceNumber: Number,
    document12RefrenceNumber: Number,
    document13RefrenceNumber: Number,
    document14RefrenceNumber: Number,
    document15RefrenceNumber: Number,
    document16RefrenceNumber: Number,
    document17RefrenceNumber: Number,
    document18RefrenceNumber: Number,
    document19RefrenceNumber: Number,

})

const User = mongoose.model('user', UserSchema);

module.exports = User;