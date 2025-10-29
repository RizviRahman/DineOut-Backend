const Item = require('../models/itemModel');
const ImageKit = require('imagekit');


// Get all items
const getAllItems = async (req, res) => {
    console.log("Backend: Fetching all items");
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


// Add a new item   
const addItem = async (req, res) => {
    const { name, price, image } = req.body;
    try {
        const newItem = new Item({ name, price, image });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


// update item details
const updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, price, image } = req.body;
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            id,
            { name, price, image },  
        );
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }   
        res.status(200).json({ message: 'Item updated successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }   
};


// Delete an item
const deleteItem = async (req, res) => {
    const { id } = req.params; 
    try {
        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const imagekit = new ImageKit({
  publicKey: 'public_J0TRMjxwhd3IjjpLLFbVD6neH7Q=',   
  privateKey: 'private_8pbN0l05hG9TjXQ/AGrRiFd+Jqw=',                    
  urlEndpoint: 'https://ik.imagekit.io/imgOmee',     
});

const uploadImageAuth = (req, res) => {
  const authenticationParameters = imagekit.getAuthenticationParameters();
  res.status(200).json(authenticationParameters);
}





module.exports = {
    getAllItems,
    addItem,
    updateItem, 
    deleteItem,
    uploadImageAuth
};