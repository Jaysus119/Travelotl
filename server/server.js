// IMPORTS
const express = require ('express');
const path = require ('path');

// .ENV FILE USAGE
require('dotenv').config();

// DEFAULT IMPORTS OF ROUTERS
const authRouter = require('./routers/authRouter.js');    // LOGIN, REGISTER, LOGOUT, ETC
const apiRouter = require('./routers/apiRouter.js');      // ITINERY, ETC
const rootRouter = require('./routers/rootRouter.js');    // SERVES FILES

// NAMED IMPORTS OF ERROR HANDLERS (Global and Default (e.g, 404) )
const { 
  globalErrorHandler, 
  defaultErrorHandler 
} = require('./serverConfigs/globalErrorHandler.js');

// NAMED IMPORTS OF MIDDLEWARE / SERVER CONFIGS
const { 
  setupMiddlewares, 
  startServer 
} = require('./serverConfigs/serverConfigs.js');

// SERVER DECLARATIONS
const app = express();

setupMiddlewares( app );

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app
// ROOT ROUTE FOR FILE SERVING (NON-WEBPACK)
   .get('/', rootRouter )
      /**
       *  ['/']          (FOR ROUTER see "./rootRouter.js")
       */
// ROUTERS FOR ROUTING
   .use('/auth', authRouter )
      /**
       *  ['/auth']      (FOR ROUTER see "./routers/authRouter.js")
       */
   .use('/api', apiRouter )
      /**
        * ['/api']       (FOR ROUTER see "./routers/apiRouter.js")
        * ['/api/itnry'] (FOR ROUTER see "./routers/apiRouters/itnryRouter.js")
        */

// 404 HANDLER  (NOTE: tobe modified for OAuth)
   .use( defaultErrorHandler )

// USE GLOBAL ERROR HANDLER
   .use( globalErrorHandler );

//START SERVER COMMAND
startServer( app, PORT, HOST );