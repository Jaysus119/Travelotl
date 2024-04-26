const express = require('express');
const apiRouter = express.Router();


// ROOT ('/api')

apiRouter.post('/', 
  (req, res, next) => {
    console.log("Sample [/api] middleware.")
    return next();
  },
  (req, res) => {
    return res.status(200).json('You have reached the [/api] endpoint.');
  }
)

// ENDPOINT:  /api/users

apiRouter.post('/users', 
  (req, res, next) => {
    console.log("Sample [/api/users] middleware.")
    return next();
  },
  // registerUser, // COMMENTED OUT FOR TESTING:
  (req, res) => {
    console.log('made it to server.js')
    return res.status(200).json('You have reached the [/api/users] endpoint.');
  }
);

module.exports = apiRouter;