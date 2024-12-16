const Customer = require("../models/customer");

exports.CreateCusomer = async (req, res) => {
  try {
    const { name, email } = req.body;
    const customer = await Customer.create({ name, email });
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ error: "failed to create the customer" });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(201).json(customers);
  } catch (error) {
    res.status(500).json({ error: "failed to fetch the customers!" });
  }
};


exports.getCutomerById = async (req,res) => {
    try{

        const {id} = req.params;
        const customer = await Customer.findByPk(id);
        if(!customer) return res.status(404).send("Customer Not Found!");
        res.status(201).json(customer);
    }
    catch(error)
    {
        res.status(500).json({error:"Failed to get the customer by Id!"})
    }
}


exports.updatecustomerById = async (req,res) => {

  try{

    const {id} =  req.params;
    const {name,email} =  req.body;

    const customer = await Customer.findByPk(id);

    if(!customer)
    {
      return res.send("Customer not found!")
    }

    const UpdatedCust = await customer.update({name,email});
    UpdatedCust.save();
    res.status(201).json({messege:"Customer updated successfully!",UpdatedCust});
    
  }
  catch(error)
  {
    res.status(500).json(error,"failed to update the customer!");
  }

}


exports.deletecutomerById = async (req,res) => {

  
  try
  {
    const {id} = req.params;

    const Customer =  await Customer.findByPk(id);

    if(!Customer)
    {
    return res.status(404).json({messege:"failed to find the customer"})
    }

    const deleteCust = await Customer.destroy();
    res.status(201).json({messege:"customer deleted successfully!",deleteCust})

  }

  catch(error)
  {
    res.status(500).json(error,"failed to delete the customer!");
  }

}
  
