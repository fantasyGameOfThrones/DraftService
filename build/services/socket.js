'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.io = undefined;

var _server = require('./../server/server');

_server.io.on('connection', function (socket) {
  console.log('new client joined');
});

exports.io = _server.io;