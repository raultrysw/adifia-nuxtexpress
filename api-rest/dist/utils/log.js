'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = logFactory;
var chalk = require('chalk');

var LOG_LEVELS = {
    'error': chalk.bold.red,
    'info': chalk.bold.blue,
    'debug': chalk.bold.yellow
};
var NOT_LOGS_IN_PRODUCTION = ['debug'];

function logFactory(headMainText) {
    return function log(LOG_LEVEL, message) {
        var NOT_LOG_IN_PRODUCTION = NOT_LOGS_IN_PRODUCTION.indexOf(LOG_LEVEL) != -1;
        var notLog = NOT_LOG_IN_PRODUCTION && process.env.NODE_ENV === 'production';

        if (notLog) return;

        var header = LOG_LEVELS[LOG_LEVEL](headMainText + ' ' + new Date().toLocaleString());
        console.log(header, message);
    };
}