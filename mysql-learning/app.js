const express = require("express");
require('dotenv').config();
const fs = require('fs');
const axios = require('axios');
const Redis = require('ioredis');
const {processQueue} = require('./services/notificationQueue');
const notificationRoute = require('./routes/notificationRoutes');
const httpMiddleware = require("./middlewares/HttpsMiddleware");
const https = require('https');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet  = require('helmet');
const rateLimit = require('express-rate-limit')
const sequelize = require("./utills/database"); // Database configuration
const passport  = require('./config/passport-config');
const customerRoutes = require("./routes/customerRoute"); // Customer routes
const orderRoutes = require("./routes/orderRoute"); // Order routes
const authorRoutes = require("./routes/authorRoutes");
const bookRoutes = require("./routes/bookRoutes");
const AuthorbookRoutes =  require('./routes/AssociationsRoute');
const CachingRoute =  require('./routes/CachingRoute');
const UserRoutes =  require('./routes/UserRoutes');
const RefreshRoute =  require('./routes/RefreshRoute');
const RegisterRoute = require('./routes/RegisterRoute');
const Book  = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user")
const AuthorBooks = require("./models/AuthorBooks");
const { func } = require("joi");


const app = express();
const redis = new Redis();
// Trust the first proxy

(async () => {
  try {
      // Test connection
      await redis.set('my_key', 'Hello, Redis!');
      const value = await redis.get('my_key');
      console.log('Value:', value); // Should print: Hello, Redis!
  } catch (error) {
      console.error('Redis error:', error);
  } finally {
      redis.disconnect();
  }
})();




// CORS
const CorsOptions = {
  origin:["http:localhost:4000"],
  methods:['get','post','put','delete','patch'],
  Credential:true,
}


// SSL options
const sslOption = {
  key:fs.readFileSync('./server.key'),
  cert:fs.readFileSync('./server.cert'),
}

// Create an HTTPS server
https.createServer(sslOption,app).listen(3443,()=>{
  console.log('secure server running on the port https://localhost:3443 Now!!')
})


// Place this middleware first
app.use(httpMiddleware);
app.use(cors(CorsOptions));
app.use(cookieParser());
// rate limiting
const limiter  = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max:10,
  message:"Too many requests from this IP, please try again after an minute!"
})

app.use(limiter);

// Middleware
app.use(cookieParser());
app.use(helmet());
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); 
// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(passport.initialize());// Initialize Passport

// Routes
app.use("/customers",passport.authenticate('jwt',{session:false}), customerRoutes); // Routes for customer operations
app.use("/orders", orderRoutes); // Routes for order operations
app.use("/authors", authorRoutes); // Routes for author operations
app.use("/books", bookRoutes); // Routes for author operations
app.use('/authorbook',AuthorbookRoutes);//Routes foe Authorbook operations
app.use('/auth',UserRoutes); // routes for the login and registration
app.use('/',RefreshRoute); //route for the refreshing the tokens after the login
app.use("/",RegisterRoute); //route for the signup of the user
app.use("/notification",notificationRoute);
app.use("/caching",CachingRoute);


setInterval(processQueue,1000);

// Sync database and start the server
sequelize
  .sync() // Syncs models to the database
  .then(() => {
    console.log("Database synced successfully!");
    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

  app.get("/",function(req,res)
{
  res.send("Welcome to the Sequelize + Node Js Application BY Ridham Savaliya!")
})



app.get('/weather', async function (req, res) {
  const city = req.query.city || "Surat";
  const apikey = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

  try {
    // Await the API response
    const response = await axios.get(url);

    // Extract temperature data and convert to Celsius
    const kelvinTemp = response.data.main.temp;
    const tempCelsius = (kelvinTemp - 273.15).toFixed(2); // Round to 2 decimal places

    // Send the response to the client
    res.status(200).json({
      city: response.data.name, // City name
      weather: response.data.weather[0].description, // Weather description
      temperature: `${tempCelsius} °C`, // Temperature in Celsius
      feels_like: `${(response.data.main.feels_like - 273.15).toFixed(2)} °C`, // Feels like
      temp_min: `${(response.data.main.temp_min - 273.15).toFixed(2)} °C`, // Min temp
      temp_max: `${(response.data.main.temp_max - 273.15).toFixed(2)} °C`, // Max temp
      pressure: response.data.main.pressure, // Pressure in hPa
      humidity: response.data.main.humidity, // Humidity in %
      visibility: `${response.data.visibility / 1000} km`, // Visibility in km
      wind_speed: `${response.data.wind.speed} m/s`, // Wind speed in m/s
      country: response.data.sys.country, // Country code
      sunrise: new Date(response.data.sys.sunrise * 1000).toLocaleTimeString(), // Sunrise time
      sunset: new Date(response.data.sys.sunset * 1000).toLocaleTimeString(), // Sunset time
    });

    console.log(response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);

    // Handle errors appropriately
    if (error.response) {
      res.status(error.response.status).json({ message: error.response.data.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
});


// setting a cookie

app.get('/setcookie',function(req,res){
  res.cookie('Authtoken','ridham9499.',{
    secure:true,
    sameSite:true,
    httpOnly:true,
    maxAge:24 * 60 * 60 * 1000,
  })
  res.send('Cookie has been set!')
})


// Getting a cookie

app.get('/getcookie',function(req,res){

  const cookie =  req.cookies.Authtoken;
  res.send(cookie);

})


module.exports = app;
