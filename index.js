const express = require('express');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const mongoose = require('mongoose');
const util = require('util');
const jwt = require('jsonwebtoken');
const tripMatcher = require('./blackbox/tripMatcher')


//setup express app

const app = express();

//connect to mongo


mongoose.connect('mongodb://localhost/tsgo8', { useMongoClient: true });

mongoose.Promise = global.Promise;


//make website folder available first of all

app.use(express.static('public'));

//lets adjust middleware to read body of request and response to it
app.use(bodyParser.json());

//lets adjust middleware to validate all kind of inputs even before db

app.use(validator());



//initialize routes middleware
app.use('/ApI', require('./routes/api'));


//error handling middleware

app.use(function(err,req,res,next){

    res.status(422).send({error: err.message});

});


//listen for requests
const port = 4000;
app.listen(process.env.port || port, function(){

   console.log('now listning for req on ' + port)
});


