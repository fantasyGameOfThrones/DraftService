'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutable = require('immutable');

var _handlers = require('./handlers');

var handlers = _interopRequireWildcard(_handlers);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var DEFAULT_STATE = {};

// todo: pull out timer into own reducer

exports.default = function () {
  var state = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_STATE : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case "RECEIVE_INITAL_DATA":
      return handlers.receiveInitialData(state, action.payload);
    case "TEAM_LOG_ON":
      return handlers.teamLogOn(state, action.payload);
    case "TEAM_LOG_OFF":
      return handlers.teamLogOff(state, action.payload);
    case 'START_DRAFT':
      return handlers.startDraft(state);
    case 'END_DRAFT':
      return handlers.endDraft(state);
    case "INIT_TIMER":
      return handlers.initTimer(state, action.payload);
    case "START_TIMER":
      return handlers.startTimer(state);
    case "DECREMENT_TIMER":
      return handlers.decrementTimer(state);
    case "STOP_TIMER":
      return handlers.stopTimer(state);
    case "DRAFT_CHARACTER":
      return handlers.draftCharacter(state, action.payload);
    case "DRAFT_RANDOM":
      return handlers.draftRandom(state);
    case "RESET_AUTO_DRAFT":
      return handlers.resetAutoDraft(state);
    case "NEXT_TEAM":
      return handlers.nextTeam(state);
    default:
      return state;
  }
};