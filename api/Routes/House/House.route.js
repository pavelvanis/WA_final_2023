const express = require('express')
const router = express.Router()
const houseController = require('../House/HouseController')

router.get('/', houseController.getAll)

router.post('/', houseController.create)

router.get('/:id', houseController.findOne)

router.patch('/:id', houseController.update)

router.delete('/:id', houseController.delete)

module.exports = router