const allRouters = require('express').Router()
const userRouter = require('./userRouter')
const walletRouter = require('./walletRouter')
allRouters.use(userRouter)
allRouters.use(walletRouter)
module.exports = allRouters