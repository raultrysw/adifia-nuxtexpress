'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _settings = require('./settings');

var _members = require('./concepts/members/');

var _log = require('./utils/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _log2.default)("ROOT APP");
var mongoose = require('mongoose');

mongoose.connect(_settings.DB_MONGO_URI, {}, upServer);

function upServer(error) {
    if (error) {
        log('error', 'No se pudo conectar a la base de datos: ' + error.message);
        return;
    }
    console.log('Conectado correctamente a la base de datos');
    var server = (0, _express2.default)();
    server.use(_members.BASE_URL, _members.router);
    server.listen(_settings.PORT, function () {
        console.log('Running in', process.env.NODE_ENV || 'development', 'en el puerto', _settings.PORT);
    });
}