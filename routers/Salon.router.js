const express = require('express')
const SalonController = require("../controllers/Salon.controller")

const routers = express.Router();

routers.get("/getAllSalon", SalonController.getAll)
module.exports = routers