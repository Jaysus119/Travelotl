const express = require('express');
const itnryRouter = express.Router();

const tripController = require('../controllers/itinerary_controller');
const authController = require('../controllers/auth_controller');

itnryRouter
  .post('/build', 
    (req, res, next)=>{
      console.log("build route invoked");
      return next();
    },
    authController.protect, 
    tripController.buildTrip, 
    tripController.saveTrip, 
    (req, res) => {
      return res.status(201).send(res.locals.itinerary);
    }
  )

  .get('/retrieve', 
    authController.protect, 
    tripController.retrieveAll, 
    (req, res) => {
    // console.log(res.locals.allTrips[0]._id);
      return res.status(200).json(res.locals.allTrips);
    }
  )

  .delete('/delete', 
    authController.protect, 
    tripController.deleteTrip, 
    tripController.retrieveAll, 
    (req, res) => {
      return res.status(200).send(res.locals.allTrips);
    }
  );

module.exports = itnryRouter;