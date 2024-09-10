const express = require('express')
const PaymentController = require("../controllers/Payment.controller")

const routers = express.Router();

routers.get("/getAllPayment", PaymentController.getAll)
module.exports = routers