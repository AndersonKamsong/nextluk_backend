const express = require('express')

const routers = express.Router();

// to use the define user router in the User.routes
const userRoutes = require('./User.router')
routers.use("/user",userRoutes)