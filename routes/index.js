
var express = require('express');
var router = express.Router();

const { index } = require('../controller/index')

router.get('/', index);

module.exports = router;