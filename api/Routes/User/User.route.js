const express = require('express')
const router = express.Router()
const userController = require('./User.controller')

router.get('/', userController.getAll)

router.post('/', userController.create)

router.get('/:id', userController.getOne)

router.patch('/:id', userController.update)

router.delete('/:id', userController.delete)

module.exports = router