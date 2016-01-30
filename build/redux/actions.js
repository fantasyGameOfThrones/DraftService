'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopTimer = exports.decrementTimer = exports.startTimer = exports.resetAutoDraft = exports.initTimer = exports.teamLogOff = exports.teamLogOn = exports.draftRandom = exports.draftCharacter = exports.nextTeam = exports.endDraft = exports.startDraft = exports.getInitialData = undefined;

var _store = require('./store.js');

var _store2 = _interopRequireDefault(_store);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db_url = process.env.DB_URL;

var getInitialData = exports.getInitialData = function getInitialData(id) {
  return function (dispatch) {
    return (0, _isomorphicFetch2.default)(db_url + '/api/draft/' + id).then(function (response) {
      return response.json();
    }).then(function (data) {
      data.league_id = data.league.leagueId;
      data.characterIds = data.characters;
      data.order = [];
      data.draftStatus = 'PRE_DRAFT';
      data.timer = {};
      data.teams = data.league.users.map(function (team) {
        team.loggedOn = false;
        return team;
      });
      return data;
    }).then(function (data) {
      delete data.league.users;
      delete data.characters;
      return data;
    }).then(function (data) {
      dispatch({
        type: 'RECEIVE_INITAL_DATA',
        payload: data
      });
    }).catch(function (err) {
      console.log('error is in here');
      console.log(err);
    });
  };
};

var startDraft = exports.startDraft = function startDraft() {
  _store2.default.dispatch({
    type: 'START_DRAFT'
  });
};

var endDraft = exports.endDraft = function endDraft() {
  _store2.default.dispatch({
    type: 'END_DRAFT'
  });
};

var nextTeam = exports.nextTeam = function nextTeam() {
  _store2.default.dispatch({
    type: 'NEXT_TEAM'
  });
};

var draftCharacter = exports.draftCharacter = function draftCharacter(pick) {
  _store2.default.dispatch({
    type: 'DRAFT_CHARACTER',
    payload: pick
  });
};

var draftRandom = exports.draftRandom = function draftRandom() {
  _store2.default.dispatch({
    type: 'DRAFT_RANDOM'
  });
};

var teamLogOn = exports.teamLogOn = function teamLogOn(id) {
  _store2.default.dispatch({
    type: 'TEAM_LOG_ON',
    payload: id
  });
};

var teamLogOff = exports.teamLogOff = function teamLogOff(id) {
  _store2.default.dispatch({
    type: 'TEAM_LOG_OFF',
    payload: id
  });
};

var initTimer = exports.initTimer = function initTimer(secs) {
  _store2.default.dispatch({
    type: 'INIT_TIMER',
    payload: { initSeconds: secs }
  });
};

var resetAutoDraft = exports.resetAutoDraft = function resetAutoDraft() {
  _store2.default.dispatch({
    type: 'RESET_AUTO_DRAFT'
  });
};

var startTimer = exports.startTimer = function startTimer() {
  _store2.default.dispatch({
    type: 'START_TIMER'
  });
};

var decrementTimer = exports.decrementTimer = function decrementTimer() {
  _store2.default.dispatch({
    type: 'DECREMENT_TIMER'
  });
};

var stopTimer = exports.stopTimer = function stopTimer() {
  _store2.default.dispatch({
    type: 'STOP_TIMER'
  });
};