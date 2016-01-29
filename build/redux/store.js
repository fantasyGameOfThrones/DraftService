'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _redux.applyMiddleware)(_reduxThunk2.default)(_redux.createStore)(_reducer2.default);

store.subscribe(function () {
  var state = store.getState();
});

exports.default = store;