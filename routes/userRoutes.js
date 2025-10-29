const express = require('express');
const router = express.Router();
const { loginUser, signupUser, getAllUser } = require('../controllers/userController');

// POST /api/users/login
router.post('/login', loginUser);

// POST /api/users/signup
router.post('/signup', signupUser);


// router.get('/', (req, res) => {
//     res.send('User route is working');
// });


router.get('/', getAllUser);

// router.post('/', addUser);

// router.delete('/:id', deleteUser);

// router.patch('/:id', updateUser);
module.exports = router;