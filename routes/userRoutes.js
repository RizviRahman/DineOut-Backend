const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.send('User route is working');
});
// router.get('/', getAllUser);

// router.post('/', addUser);

// router.delete('/:id', deleteUser);

// router.patch('/:id', updateUser);
module.exports = router;