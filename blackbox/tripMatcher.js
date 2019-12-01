const Users = require("../models/users");
const mongoose = require("mongoose");
const User = require("../models/users")

mongoose.Promise = global.Promise;


CandidTrip = [{
    SRCcoor: [28,44],
    DSTcoor: [33,44],
    SRCrange: 0,
    DSTrange: 13000,
    TimeRange: Number,
    Date: Date,
    driver: Boolean,
    passenger: Boolean,
    DesiireToTravelWithSameGender: Boolean
}];
IndexOfRequests = [];


function blackBox(IndexOfRequests, CandidTrip) {



    User.find({
        $and:[{
                trips: {
                    Date: {
                        $gte: CandidTrip.Date(ISODate().getTime() - CandidTrip.trips.TimeRange/2)
                    }
                }
            }, {
                trips: {
                    Date: {
                        $lte: CandidTrip.Date(ISODate().getTime() - CandidTrip.trips.TimeRange/2)
                    }
                }
            }, {
                trips:{
                    SRCcoor:{
                        coordinates:{
                            
                            near:{type:"Point", coordinates:"CandidTrip.SRCcoor.coordinates"},
                            spherical: true,
                            minDistance: 0, 
                            maxDistance: CandidTrip.trips.SRCrange
                        }
                    }
                }
            },{
                trips:{
                    DSTcoor:{
                        coordinates:{
                            near:{type:"Point", coordinates:"CandidTrip.DSTcoor.coordinates"},
                            spherical: true,
                            minDistance: 0, 
                            maxDistance: CandidTrip.trips.DSTrange
                        }
                    }
                }
            }

        ]

    })









})