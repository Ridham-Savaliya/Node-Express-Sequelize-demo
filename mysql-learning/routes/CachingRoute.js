const express = require('express')
const redis = require('../config/redis');
const router = express.Router();    
const axios = require('axios');

const wheterApi = 'https://api.open-meteo.com/v1/forecast';

// caching a route

router.get('/weather', async (req, res) => {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    const cacheKey = `weather:${city.toLowerCase()}`; // Unique cache key
    try {
        // Check if data is in cache
        const cachedData = await redis.get(cacheKey);

        if (cachedData) {
            console.log('Cache hit');
            return res.json(JSON.parse(cachedData)); // Return cached data
        }

        console.log('Cache miss');
        // Fetch data from the weather API
        const response = await axios.get(wheterApi, {
            params: {
                latitude: '32.6895',
                longitude: '159.6917', // Replace with dynamic values for real use
                current_weather: false,
            },
        });
        const weatherData = response.data;

        // Store data in cache with a TTL of 3600 seconds (1 hour)
        await redis.set(cacheKey, JSON.stringify(weatherData), 'EX', 1);

        return res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
