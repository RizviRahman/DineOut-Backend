const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const { getAllItems, addItem, updateItem, deleteItem, uploadImageAuth } = require('../controllers/itemController');



router.get('/', getAllItems);

router.use(requireAuth);

router.post('/', addItem);

router.delete('/:id', deleteItem);

router.patch('/:id', updateItem);

router.get('/auth', uploadImageAuth);

module.exports = router;