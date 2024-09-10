const express = require('express')
const userController = require("../controllers/User.controller")

const routers = express.Router();

routers.get("/getAllUsers", userController.getAll)
module.exports = routers