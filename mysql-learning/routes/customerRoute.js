const express = require("express");
const customerController = require("../contollers/customerContoller");

const CustomerRouter = express.Router();

CustomerRouter.get("/",customerController.getAllCustomers);
CustomerRouter.get("/customer/:id",customerController.getCutomerById);
CustomerRouter.post("/createcustomer",customerController.CreateCusomer);
CustomerRouter.put("/customer/update/:id",customerController.updatecustomerById)
CustomerRouter.delete("/customer/delete/:id",customerController.deletecutomerById)


module.exports = CustomerRouter;
