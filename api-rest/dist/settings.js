'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var dbName = process.env.NODE_ENV === 'production' && 'adifia' || 'adifia-prueba';

var DB_MONGO_URI = exports.DB_MONGO_URI = 'mongodb://localhost/' + dbName;
var PORT = exports.PORT = process.env.NODE_ENV === 'production' && 3000 || 9000;