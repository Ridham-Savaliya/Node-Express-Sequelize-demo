const {addToQueue} = require('../services/notificationQueue');

async function NotifyUser(req,res)
{

    const notification = {  
        user:req.body.user,
        message:'You have a new notification!',
    }


    await addToQueue(notification);
    res.status(200).send('Notification sent to queue');
}


module.exports = {NotifyUser};
