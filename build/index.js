'use strict';

var _server = require('./server/server');

var _server2 = _interopRequireDefault(_server);

var _socket = require('./services/socket');

var _socket2 = _interopRequireDefault(_socket);

var _actions = require('./redux/actions');

var actions = _interopRequireWildcard(_actions);

var _store = require('./redux/store');

var _store2 = _interopRequireDefault(_store);

var _reducer = require('./redux/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _handlers = require('./redux/handlers');

var handlers = _interopRequireWildcard(_handlers);

var _logic = require('./server/logic');

var _logic2 = _interopRequireDefault(_logic);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }