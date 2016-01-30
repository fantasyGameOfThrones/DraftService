'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.io = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var io = exports.io = _socket2.default.listen(app.listen(8080));

console.log('\n  ##############################################################\n  ###                 GREETINGS HUMAN                        ###\n                i can socket @ ' + process.env.SOCKET_URL + ' \n                also, db_urL: ' + process.env.DB_URL + '                \n  ###                       ^_^                              ###\n  ##############################################################\n');

app.use('/', _express2.default.static(__dirname + '/../../client'));