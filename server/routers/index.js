const allRouters = require('express').Router()
const userRouter = require('./userRouter')
allRouters.use(userRouter)
module.exports = allRouters