const Order = require('../models/order');

exports.CreateOrder = async (req,res) =>{

    try
    {
        const {total,customerId}  = req.body;
        const CreatedOrder = await Order.create({
            total: total,
            customerId: customerId,
        });
        res.status(201).json(CreatedOrder);    
    }
    catch(error)
    {
        res.status(500).json({error:"failed to create the order!"});
    }

}
