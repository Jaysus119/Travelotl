const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../models/itnryModel')

const userController = {};

userController.registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, username, password, email } = req.body.userInfo;

    // check that all fields have been provided
    if (!firstName || !lastName || !username || !password) {
      res.status(400).json({ error: 'Please add all required fields' })
      return;
    }

    // // check if user already exists
    // const userQuery = `SELECT username FROM users WHERE username = ${email};`;
    // const userExists = await db.query(userQuery);

    // // console.log(userExists);
    // if (userExists) {
    //   res.status(400).json({ error: 'User already exists'});
    //   return;
    // }

    // hash password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const insertUser = `INSERT INTO users (password, username, firstName, lastName)
    VALUES ('test', 'test', 'test', 'test');`

    console.log('right before query')

    // create user
    db.query(insertUser, (error, results) => {
      if (error) console.log(error);
      console.log('result: ', results)
    });
    // console.log('user: ', user);

    // const idQuery = `SELECT id FROM users WHERE username = ${email};`

    // const userID = await db.query(idQuery);
    // console.log('user ID: ', userID);

    // res.locals.userToken = generateToken(user.id)


    if (firstName) {
      return next();
    } else {
      res.status(400).json({ error: 'Invalid user data'})
    }

  } catch (err) {
    const error = {
      log: 'userController.registerUser',
      message: { err: 'Error in registerUser controller'}
    };
    return next(error);
  }
}

// const loginUser = async (req, res) => {
//   console.log('request to login user', req.body);
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: 'User not found' });
//     }

//     const isValid = await bcrypt.compare(password, user.password);
//     if (!isValid) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }

//     return res.status(200).json({
//       _id: user._id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// const getUser = async (req, res) => {
//   const user = await User.findById(req.user.id);
//   try {
//     res.status(200).json({ id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email})
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error'});
//   }
  
// }

// // generate json web token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '30d'})
// }

module.exports = userController;