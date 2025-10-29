const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
require('dotenv').config(); 

const userRoutes = require('./routes/userRoutes');  
const orderRoutes = require('./routes/orderRoutes');  
const itemRoutes = require('./routes/itemRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));
// routes
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/items', itemRoutes);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}\nhttp://localhost:${PORT}/api/`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    });