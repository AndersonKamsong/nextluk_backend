const express = require('express')
const userController = require("../controllers/User.controller")

const routers = express.Router();

routers.get("/getAllUsers", userController.getAll)
routers.post("/register", userController.register)
routers.post("/login", userController.login)
module.exports = routers