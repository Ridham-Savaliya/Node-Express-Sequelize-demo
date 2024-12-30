const express= require('express');
const fs = require('fs');   
const app = express();

module.exports = (req, res, next) => {
    if (req.secure) {
      next(); // Request is secure, proceed
    } else {
      const httpsPort = 3443; // Adjust to match your HTTPS server port
      const host = req.headers.host.replace(/:\d+$/, `:${httpsPort}`);
    //   console.log('host',host)
      res.redirect(`https://${host}${req.url}`);
    }
  };
  
