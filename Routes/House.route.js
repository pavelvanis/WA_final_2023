const express = require('express')
const router = express.Router()
const houseController = require('./HouseController')

router.get('/', houseController.getAll)

router.post('/', houseController.createHouse)

router.get('/:id', houseController.findOneHouse)

router.patch('/:id', houseController.updateHouse)

router.delete('/:id', houseController.deleteHouse)

module.exports = router