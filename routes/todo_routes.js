const express = require('express')
const router = express.Router()
const TodoController = require("../controllers/todo_controller.js")

router.post('/register', TodoController.register)
router.get('/', TodoController.get)
router.get('/:id', TodoController.getById)
router.delete('/:id', TodoController.delete)
router.patch('/:id', TodoController.updateTodo)

module.exports = router