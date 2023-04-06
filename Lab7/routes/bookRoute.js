const express = require('express');
const router = express.Router();
const bookRoute = require('../controllers/bookControlller');
const clg = require('../middelware/usermid');

router.use((req, res, next) => {
    console.log('đi qua midderware');
    next();
});

router.get('/', clg.check_login, bookRoute.listBook);

router.get('/addBook', clg.check_login, bookRoute.layoutAddBook);
router.post('/addBook', clg.check_login, bookRoute.addBook);

router.get('/logout', clg.check_login, bookRoute.Logout);

module.exports = router;