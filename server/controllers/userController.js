const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../models/itnryModel')
const { createError } = require('../serverConfigs/globalErrorHandler.js')

const userController = {
  createErr: createError('userController')
};

userController.checkExistance = async (req, res, next) => {
  const { email, username } = req.dataVault.userInfo;

  try {
      // CHECK IF EMAIL OR USERNAME EXISTS IN THE "USERS" TABLE
      const query = `
        SELECT * FROM users WHERE email = $1 OR username = $2 LIMIT 1;
      `;
      const values = [email, username];
      const result = await db.query(query, values);
      console.log(result.rows)

      if (result.rows && result.rows.length > 0) {
        console.log('Existance: Found')
        // IF THE QUERY RETURNS AT LEAST ONE ROW
        // A USER WITH THE EMAIL OR USERNAME EXISTS

          return next(userController.createErr({
            //  SERVER MESSAGES
            method: 'checkExistance',
            type: 'Checking existance of user error.', 
            //  CLIENT MESSAGES     
            message: 'Please try a different (1) username and/or (2) email.  User already exists.',
            statusCode: 409,
          })
        )
      } else {
        // NO USER WITH THE EMAIL OR USERNAME EXISTS
        console.log('Existance: None Found')
        return next(); 
      }
  } catch (err) {
      console.error('Database error:', err);
      return next(userController.createErr({
        //  SERVER MESSAGES
        err,
        method: 'checkExistance',
        type: 'Database error', 
        //  CLIENT MESSAGES     
        message: 'Internal Server Error',
        //  DEFAUT STATUS USED

      })
    );
  }
}
userController.hashUsrPw = async (req, res, next) => {

  try {
    const { password } = req.dataVault.userInfo;
    
    // GENERATE SALT ROUNDS AND HASH
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // OVERWRITE PW WITH HASHED PW
    req.dataVault.userInfo.password = hashedPassword;

    return next();

  } catch (err) {
    console.error("Error hashing password:", err);
    return next(userController.createErr({
      //  SERVER MESSAGES
      err,
      method: 'hashUsrPw',
      type: 'Error hashing/processing the password.', 
      //  CLIENT MESSAGES     
      message: 'Internal Server Error',
      //  DEFAUT STATUS USED
    })
  )}
}

userController.registerUser = async (req, res, next) => {

    // DATAVAULT USED AS IT HAS HASHED PW
    const { email, username, password, firstName, lastName } = req.dataVault.userInfo;

    const insertUserQuery = `
      INSERT INTO users (email, username, password, firstName, lastName)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `
  try {
    // CREATE USER IN DB
    const result = await db.query(insertUserQuery, [email, username, password, firstName, lastName])  

    req.dataVault.userInfo.roles = req.dataVault.userInfo.roles || [];
    req.dataVault.userInfo.roles = result.rows[0].roles

    return next();

  } catch (err) {
    return next(userController.createErr({
      //  SERVER MESSAGES
      err,
      method: 'registerUser',
      type: 'Database Error.', 
      //  CLIENT MESSAGES     
      message: 'Failed to register user due to server error.',
      //  DEFAUT STATUS USED);
    })
  )}
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