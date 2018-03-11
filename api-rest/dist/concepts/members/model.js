'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _log = require('../../utils/log');

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mongoose = require('mongoose');
var log = (0, _log2.default)('MEMBERS MODEL');

var schema = new mongoose.Schema({});

var MemberClass = function MemberClass() {
  _classCallCheck(this, MemberClass);
};

schema.loadClass(MemberClass);

var membersModel = mongoose.model('Member', schema);
log('debug', 'Modelo members creado');

exports.default = membersModel;