'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopTimer = exports.resetAutoDraft = exports.decrementTimer = exports.startTimer = exports.initTimer = exports.draftCharacter = exports.teamLogOff = exports.teamLogOn = exports.endDraft = exports.startDraft = exports.nextTeam = exports.receiveInitialData = undefined;

var _socket = require('./../services/socket.js');

var _immutable = require('immutable');

var receiveInitialData = exports.receiveInitialData = function receiveInitialData(state, payload) {
  return payload;
};

var nextTeam = exports.nextTeam = function nextTeam(state) {

  var index = state.currentTeamIndex;

  if (index === state.order.length - 1) {
    return endDraft(state);
  } else {
    index = index + 1;
    state.currentTeamIndex = index;
    state.currentTeamId = state.order[index];
    return state;
  }
};

var startDraft = exports.startDraft = function startDraft(s) {
  var state = (0, _immutable.fromJS)(s);
  var order = state.get('teams').filter(function (team, key) {
    return team.get('loggedOn');
  }).map(function (team, key) {
    return team.get('id');
  }).sort(function (a, b) {
    return Math.random() > .5;
  });
  var order2 = order.concat(order.reverse());
  var order3 = order2.concat(order2.concat(order2));
  return state.merge((0, _immutable.fromJS)({
    order: order3,
    draftStatus: 'MID_DRAFT',
    currentTeamIndex: 0,
    currentTeamId: order3.get(0)
  }))
  /***/
  .toJS();
};

var endDraft = exports.endDraft = function endDraft(state) {
  state.draftStatus = 'POST_DRAFT';
  delete state.currentTeamId;
  delete state.currentTeamIndex;
  return state;
};

//combine these two into one
var teamLogOn = exports.teamLogOn = function teamLogOn(state, id) {
  state.teams = state.teams.map(function (team) {
    if (team.id.toString() === id) {
      team.loggedOn = true;
    }
    return team;
  });
  return state;
};

var teamLogOff = exports.teamLogOff = function teamLogOff(s, id) {
  var state = (0, _immutable.fromJS)(s);
  return state.updateIn(['teams'], function (teams) {
    return teams.map(function (team) {
      return team.get('id').toString() === id ? team.set('loggedOn', false) : team;
    });
  })
  /***/
  .toJS();
};

var draftCharacter = exports.draftCharacter = function draftCharacter(s, pick) {
  var state = (0, _immutable.fromJS)(s);

  if (state.get('draftStatus') === 'MID_DRAFT') {
    var _ret = function () {

      var team_index = state.get('teams').map(function (team) {
        return team.get('id').toString();
      }).indexOf(pick.team_id.toString());

      var char_index = state.get('characterIds').indexOf(pick.char_id);

      return {
        v: state.updateIn(['teams', team_index, 'characters'], function (characters) {
          return characters.push(pick.char_id);
        }).updateIn(['characterIds'], function (ids) {
          return ids.splice(char_index, 1);
        })
        /***/
        .toJS()
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  } else {
    return state
    /***/
    .toJS();
  }
};

var initTimer = exports.initTimer = function initTimer(state, payload) {
  state.timer.seconds = 5;
  return state;
};

var startTimer = exports.startTimer = function startTimer(state, payload) {
  state.timer.timerIsRunning = true;
  return state;
};

var decrementTimer = exports.decrementTimer = function decrementTimer(s, payload) {
  var state = (0, _immutable.fromJS)(s);
  var autoDraft = false;
  var newState = state.updateIn(['timer', 'seconds'], function (seconds) {
    seconds = seconds - 1;
    if (seconds === 0) {
      autoDraft = true;
    }
    return seconds;
  });
  if (autoDraft) {
    return newState.set('autoDraft', true)
    /***/
    .toJS();
  }
  return newState
  /***/
  .toJS();
};

var resetAutoDraft = exports.resetAutoDraft = function resetAutoDraft(state) {
  state.autoDraft = false;
  return state;
};

var stopTimer = exports.stopTimer = function stopTimer(state) {
  state.timer.timerIsRunning = false;
  state.timer.seconds = null;
  return state;
};