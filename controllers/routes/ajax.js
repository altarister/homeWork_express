var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log('GET 방식으로 서버 호출됨');
    var message = '성공';
    res.send({
        success: true,
        data: require('../json/deal.json'),
        message: message
    });
});

module.exports = router;