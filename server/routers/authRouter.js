const express = require('express');
const authRouter = express.Router();
const userController = require('./../controllers/userController.js')

// REGISTER
authRouter
  .post('/register',
    (req, res, next) =>{
      const { firstName, lastName, username, password, email } = req.body.userInfo;
      console.log(`Received: ${firstName}, ${lastName}, ${username}, ${password}, ${email}`)
      console.log("Welcome to the [/register] endpoint.")
      return next();
    },
    userController.registerUser,
    (req, res, next ) => {

    },
    (req, res) =>{

      return res.status(200).json("You have exited the [/register] endpoint.")
    }
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