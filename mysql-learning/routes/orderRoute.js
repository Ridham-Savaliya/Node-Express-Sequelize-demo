const express = require('express');
const OrderContoller = require('../contollers/orderContoller');

const OrderRoute =  express.Router();

OrderRoute.post("/",OrderContoller.CreateOrder);

module.exports = OrderRoute;
