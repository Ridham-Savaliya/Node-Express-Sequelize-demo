const redis = require('../config/redis');

// Handle connection and errors
redis.on('connect', () => {
    console.log('Connected to Redis');
});

redis.on('error', (err) => {
    console.error('Redis error: ', err);
});

async function addToQueue(notification) {
    try {
        // Push the notification to the queue
        await redis.lPush('notificationQueue', JSON.stringify(notification));
        console.log('Notification added to the queue');
    } catch (error) {
        console.error('Error adding to notification queue', error);
    }
}

async function processQueue() {
    try {
        // Pop the notification from the queue
        const job = await redis.rPop('notificationQueue');
        
        if (job) {
            const notification = JSON.parse(job);
            console.log('Processing notification', notification);
        }
        // Removed the "Queue is empty" log to prevent repeated messages
    } catch (error) {
        console.error('Error processing the queue', error);
    }
}

// Automatically run the processQueue function every few seconds
setInterval(processQueue, 1000);

module.exports = { addToQueue, processQueue };
