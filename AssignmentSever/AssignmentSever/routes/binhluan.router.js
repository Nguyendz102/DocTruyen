var express = require('express');
var router = express.Router();
var api_bl = require('../controllers/binhluan.api');


router.get('/binhluan', api_bl.list );
router.post('/binhluan/add', api_bl.add);
router.put('/binhluan/edit/:id', api_bl.update);
router.get('/binhluan/delete/:id',api_bl.delete);
module.exports = router;
