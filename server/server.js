// IMPORTS
const express = require ('express');
const path = require ('path');

// .ENV FILE USAGE
require('dotenv').config();

// ROUTER DECLARATIONS
const authRouter = require('./routers/authRouter.js');
const apiRouter = require('./routers/apiRouter.js');
const itnryRouter = require('./routers/itnryRouter.js');

// SERVER DECLARATIONS
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.use(express.json())
   .use(express.static(path.join(__dirname, 'client')))
   .use(express.urlencoded({ extended: true }))

// ROOT ROUTE FOR FILE SERVING (NON-WEBPACK)
   .get('/', 
      (req, res) => {
        res.sendFile(path.join(__dirname,'../index.html'))
      }
    )

// ROUTER ROUTING
   .use('/itnry', itnryRouter)
   .use('/auth', authRouter)
   .use('/api', apiRouter)

// 404 HANDLER  (NOTE: tobe modified for OAuth)
   .use(
      (req, res) => {
        res.status(404).send('Not Found');
      }
    )

//GLOBAL ERROR HANDLER
   .use(
      (err, req, res, next) => {
        const defaultErr = {
          log: 'Express error handler caught unknown middleware error',
          status: 500,
          message: { err: 'An error occured' },
        };
        const errorObj = Object.assign({}, defaultErr, err);
        console.log(errorObj.log);
        return res.status(errorObj.status).json(errorObj.message);
      }
    )

//START SERVER COMMAND
   .listen(
      PORT,
      HOST, 
      () => {
        console.log(`Server is running on http://${HOST}:${PORT} ...`)
      }
    );