'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BASE_URL = exports.model = exports.router = undefined;

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BASE_URL = '/api/members';
exports.router = _api2.default;
exports.model = _model2.default;
exports.BASE_URL = BASE_URL;