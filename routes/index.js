const express = require('express')
const router = express.Router()
const users = require('./user_routes.js')
const todos = require('./todo_routes.js')

router.use('/users',users)
router.use('/todos', todos)

module.exports = router