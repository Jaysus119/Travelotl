const express = require('express');
const rootRouter = express.Router();

rootRouter.get('/',
  (req, res) => {
    res.sendFile(path.join(__dirname,'../index.html'))
  }
)


module.exports = rootRouter;