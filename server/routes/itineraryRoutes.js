const express = require('express');
const router = express.Router();
const tripController = require('../controllers/itinerary_controller');
const authController = require('../controllers/auth_controller');

router.post(
  '/build',
  (req, res, next) => {
    console.log('build route invoked');
    return next();
  },
  authController.protect,
  tripController.buildTrip,
  tripController.saveTrip,
  (req, res) => {
    console.log('nick is ok', res.locals.itinerary);
    res.status(200).json(res.locals.itinerary);
  }
);

router.get(
  '/retrieve',
  authController.protect,
  tripController.retrieveAll,
  (req, res) => {
    // console.log(res.locals.allTrips[0]._id);
    res.status(200).json(res.locals.allTrips);
  }
);

router.delete(
  '/delete',
  authController.protect,
  tripController.deleteTrip,
  tripController.retrieveAll,
  (req, res) => {
    res.status(200).send(res.locals.allTrips);
  }
);

router.patch('/update', tripController.updateTrip, (req, res) => {
  console.log('lets edit some stuff!', req.body.itinerary);
  res.sendStatus(200);
});

module.exports = router;
