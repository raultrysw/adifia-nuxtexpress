'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _controllers = require('./controllers');

var router = new _express.Router();
router.get('/', _controllers.get);

exports.default = router;