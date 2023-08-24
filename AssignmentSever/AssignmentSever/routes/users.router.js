var express = require('express');
var router = express.Router();
var api_user = require('../controllers/user.api2');


router.get('/users', api_user.list );
router.post('/users/add', api_user.add);
router.put('/users/edit/:id', api_user.edit);
router.get('/users/delete/:id',api_user.delete);
module.exports = router;
