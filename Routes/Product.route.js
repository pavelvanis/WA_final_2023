const express = require('express')
const router = express.Router()

const ProductController = require('./Product.controller')

router.get('/', ProductController.getAllProducts)

router.post('/', ProductController.createProduct)

router.get('/:id', ProductController.getOneProduct)

router.patch('/:id', ProductController.updateProduct)

router.delete('/:id', ProductController.deleteProduct)

module.exports = router;