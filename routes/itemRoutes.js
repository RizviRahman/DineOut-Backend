const express = require('express');
const router = express.Router();
const { getAllItems, addItem, updateItem, deleteItem, uploadImageAuth } = require('../controllers/itemController');



router.get('/', getAllItems);

router.post('/', addItem);

router.delete('/:id', deleteItem);

router.patch('/:id', updateItem);

router.get('/auth', uploadImageAuth);

module.exports = router;