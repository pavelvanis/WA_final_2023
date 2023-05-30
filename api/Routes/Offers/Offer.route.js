const express = require('express')
const router = express.Router()
const offerController = require('./Offer.controller')

router.get('/', offerController.getAll)

router.post('/', offerController.create)

router.get('/:id', offerController.getOne)

router.patch('/:id', offerController.update)

router.delete('/:id', offerController.delete)

module.exports = router