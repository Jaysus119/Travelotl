const express = require('express');
require('dotenv').config();

const app = express();

const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

const db = require('../db_models/itnryModel.js')

const { createError } = require('../serverConfigs/globalErrorHandler.js')

// TEST DATA - DELETE WHEN FINISHEDßß
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
// ========= end of TEST DATA ============

const tripController = {
  createErr: createError('tripController')
}


// buildTrip - To fetch itinerary from API request to Open AI
tripController.buildTrip = async (req, res, next) => {
  console.log("buildTrip invoked");
  const { destination, startDate, endDate, activities, budget, travelers, groupDescription } = req.body;
  res.locals.tripName = `${destination} from ${startDate} to ${endDate}`;

  const prompt = `Make an itinerary for a trip for ${travelers} to ${destination} from ${startDate} until ${endDate}. I have a budget of ${budget}. Include the following types of attractions: ${activities.join(', ')} for a ${groupDescription}. Organize the itinerary by the following times of day: morning, afternoon, and evening. Recommend specific places of interest with their address. Limit cross-city commutes by grouping places of interest by geography for each day. Output the response in json format following this schema:
    {
      itinerary: {
        date: {
          time of day: {
            activity: string,
            description: string,
            address: string,
          }
        }
      }
    }
    Thank you.`;


  try {
    const completion = await openai.chat.completions.create({
      messages: [{ "role": "system", "content": "You are a helpful travel planning assistant." },
      {
        "role": "user",
        "content": prompt,
      }],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
    });

    console.log(completion.choices[0]);
    res.locals.itinerary = JSON.parse(completion.choices[0].message.content);
    return next();
  } catch (err) {
    console.log('Build Trip Error:', err);
    return next(tripController.createErr({
      err,
      method: 'buildTrip',
      type: 'Controller Error',
      message: 'Internal Server Error',
    }))
  }
}
// saveTrip - To save the contents of the generated itinerary into the database
tripController.saveTrip = async (req, res, next) => {

  //get id off req body
  const { id } = req.body;

  //get itinerary off locals when created
  const { itinerary } = res.locals.itinerary;

  //query to insert itinerary into table 
  const itnryQuery = `INSERT INTO itinerary (${itinerary})
    SELECT i.user_id FROM itinerary i 
    INNER JOIN users u
    ON i.user_id = u.${id};`;

  try {
    //add itinerary to table 
    const saved = await db.query(itnryQuery)
    alert('Trip has been saved!')

    return next();


  } catch (err) {
    console.log('Save Trip error:', err);
    return next(tripController.createErr({
      err,
      method: 'saveTrip',
      type: 'Controller Error',
      message: 'Internal Server Error',
    }))
  }

}

// commented out old code below to work on later

// deleteTrip - To delete the itinerary from the database based on the ObjectId
// tripController.deleteTrip = async (req, res, next) => {
//   console.log(req.body);
//   console.log("deleteTrip Middleware - tripId:", req.body.tripId);
//   Itinerary.findOneAndDelete({ "_id": `${req.body.tripId}` })
//     .then(result => {
//       if (result) {
//         console.log("Itinerary deleted from the database - deleteTrip");
//       } else {
//         console.log("ObjectId not found. Nothing deleted");
//       }
//       return next();
//     })
//     .catch(err => {
//       console.log("could not locate itinerary based on id passed in - deleteTrip middleware");
//       console.error("deleteTrip ERROR =>", err);
//     })
// }

// retrieveAll - To retrieve all trips saved for a specific user
// tripController.retrieveAll = async (req, res, next) => {
//   Itinerary.find({
//     "email": req.body.email,
//   })
//     .then(result => {
//       // console.log(result);
//       res.locals.allTrips = result;
//       console.log("All trips retrieved - retrieveAllTrips middleware");
//       return next();
//     })
//     .catch(err => {
//       console.log("could not retrieve all trips - retrieveAllTrips middleware");
//       console.error("retrieveAllTrips ERROR =>", err);
//     })
// }

module.exports = tripController;