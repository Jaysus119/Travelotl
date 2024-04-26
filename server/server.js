const express = require ('express');
const path = require ('path');
const { registerUser } = require ('./controllers/userController.js');

require('dotenv').config();

//use environmental variables
// dotenv.config({ path: './config.env' });


//move routes to server.js


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.urlencoded({ extended: true }));

// Root
// app.get('/', (res))

// Register user
app.post('/api/users/', registerUser, (req, res) => {
  console.log('made it to server.js')
  return res.sendStatus(200)
  // .json({userToken: res.locals.userToken})
});

// Login

// Itinerary


//app.use('/api/trip', require('./routes/itineraryRoutes'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'../index.html'))
})

// 404 handler
app.use((req, res) => {
  res.status(404).send('Not Found');
});

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}...`));