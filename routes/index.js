
var express = require('express');
var router = express.Router();

const { home, product } = require('../controller/index')
/* GET home page. */
router.get('/', home);

module.exports = router;