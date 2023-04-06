const express = require('express');
const router = express.Router();
const authRoute = require('../controllers/authController');

router.get('/', authRoute.layoutLogin);
router.post('/login', authRoute.login);

router.get('/dangKy', authRoute.layoutSignUp);
router.post('/dangKy', authRoute.signUp);



module.exports = router;