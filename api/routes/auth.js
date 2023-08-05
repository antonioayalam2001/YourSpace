const { Router } = require('express');
const router = Router();
const { register, login, emptyTable , logout } = require('../controllers/authController');

router.post('/login', login);
router.post('/register', register);
router.delete('/deleteAll', emptyTable);
router.get('/logout', logout);

module.exports = router;