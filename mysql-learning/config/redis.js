const { createClient } = require('redis'); // Import the correct method
const redis = createClient(); // Create a Redis client instance

// Event listeners for Redis client
redis.on('connect', () => {
    console.log('Connected to Redis!');
});

redis.on('error', (error) => {
    console.error('Redis error:', error);
});

// Explicitly connect to Redis
(async () => {
    try {
        await redis.connect(); // Use the connect() method
        console.log('Redis connection established explicitly');
    } catch (error) {
        console.error('Error connecting to Redis:', error);
    }
})();

module.exports = redis;
