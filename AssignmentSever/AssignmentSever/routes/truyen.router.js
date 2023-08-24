var express = require('express');
var router = express.Router();
var api_truyen = require('../controllers/truyen.api');


router.get('/truyen', api_truyen.list );
router.post('/truyen/add', api_truyen.add);
router.put('/truyen/edit/:id', api_truyen.update);
router.get('/truyen/delete/:id',api_truyen.delete);
module.exports = router;
