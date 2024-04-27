const express = require('express');
const authRouter = express.Router();
const userController = require('./../controllers/userController.js')
const vaultController = require('./../controllers/vaultController.js')

// REGISTER
authRouter
  .post('/register',
    (req, res, next) =>{ console.log("Welcome to the [/register] endpoint."); return next(); },
    vaultController.registerBodyCheck,
    vaultController.initializeUsrVault,
    vaultController.populateUsrVault,
    userController.checkExistance,
    userController.hashUsrPw,
    userController.registerUser,
    vaultController.resLocalsSave,
    vaultController.cleanupUsrVault,
    (req, res) =>{ return res.status(200).json( res.locals ) }
  )

// LOGIN
  .post('/login',
    (req, res, next) =>{
      console.log("Welcome to the [/login] endpoint.")
      return next();
    },
    (req, res) =>{

      return res.status(200).json("You have exited the [/login] endpoint.")
    }
  )

// LOGOUT
  .post('/logout',
    (req, res, next) =>{
      console.log("Welcome to the [/logout] endpoint.")
      return next();
    },
    (req, res) =>{

      return res.status(200).json("You have exited the [/logout] endpoint.")
    }
  )

module.exports = authRouter;



// const express = require('express');
// const router = express.Router();
// const { registerUser, loginUser, getUser } = require('../controllers/userController');
// const { protect } = require('../controllers/auth_controller');

// router.post('/', registerUser);
// router.post('/login', loginUser);
// router.get('/user', protect, getUser);

// module.exports = router;