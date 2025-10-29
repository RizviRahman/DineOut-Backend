const Order = require('../models/orderModel');

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);   
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


// Add a new order
const addOrder = async (req, res) => {
    const { user, customerName, items } = req.body;
    const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);
    try {
        const newOrder = new Order({ user, customerName, items, totalAmount });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


// update order details
const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status },  
        );
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order updated successfully'});
    } catch (error) {   
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};



// Delete an order
const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });    
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};



module.exports = {
    getAllOrders,
    addOrder,
    updateOrder,
    deleteOrder
};