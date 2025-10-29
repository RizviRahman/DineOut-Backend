const express = require('express');
const { getAllOrders, addOrder, updateOrder, deleteOrder } = require('../controllers/orderController');
const router = express.Router();



// router.get('/', (req, res) => {
//     res.send('order route is working');
// });

router.get('/', getAllOrders);

router.post('/', addOrder);

router.patch('/:id', updateOrder);

router.delete('/:id', deleteOrder);



module.exports = router;