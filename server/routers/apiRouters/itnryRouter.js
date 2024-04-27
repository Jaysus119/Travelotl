const express = require('express');
const itnryRouter = express.Router();

const tripController = require('../../controllers/itnryController');
const authController = require('../../controllers/authController');

itnryRouter
  .get('/:itnry',
    /**
     *  GET METHOD MESSAGES TO ['/api/itnry']
     *  GET ALL RECORDS: (:itnry is set to all)
     *  GET THIS RECORD: (:itnry is set to recordId slated for retrieval)
     * 
     */ 

    authController.protect, 
    tripController.retrieveAll, 
    (req, res) => {
    // console.log(res.locals.allTrips[0]._id);
      return res.status(200).json(res.locals.allTrips);
    }
  )
  .patch('/:itnry',
    /**
     * PATCH METHOD HANDLER TO ['/api/itnry']
     * EDIT THIS RECORD:  (:itnry is set to recordId slated for edit )
     *                    ( && req.body contains edit info )
     */
    
    (req, res, next)=>next(),
    (req, res, next)=>next(),
    (req, res)=>res.status(200).json('PATCH to /api/itnry'),
  )
  .post('/', 
    /**
     * POST METHOD MESSAGES TO ['/api/itnry']
     * ADD A RECORD FOR USER: (no req.params && req.body contains new record information)
     */

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
  .delete('/:itnry', 
  /**
   * DELETE METHOD MESSAGES TO ['/api/itnry']
   * DELETE ALL RECORDS: (:itnry is set to all) 
   * DELETE THIS RECORD: (:itnry is set to the tripId slated for deletion)
   */

    authController.protect, 
    tripController.deleteTrip, 
    tripController.retrieveAll, 
    (req, res) => {
      return res.status(200).send(res.locals.allTrips);
    }
  );

module.exports = itnryRouter;


// SAMPLE DATA
// const travelPlans = {
//   destination: 'Los Angeles, CA',
//   startDate: 'June 2, 2024',
//   endDate: 'June 8, 2024',
//   activities: [],
//   budget: 500,
//   travelers: 1,
//   groupDescription: 'Solo traveler',
//   loading: false,
//   error: null,
// }
// 