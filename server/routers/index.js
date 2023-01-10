const allRouters = require('express').Router()
const categoryRouter = require('./categoryRouter')
const userRouter = require('./userRouter')
const walletRouter = require('./walletRouter')
allRouters.use(categoryRouter)
allRouters.use(userRouter)
allRouters.use(walletRouter)
module.exports = allRouters