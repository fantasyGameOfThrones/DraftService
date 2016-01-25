'use strict';

var _actions = require('./../redux/actions');

var actions = _interopRequireWildcard(_actions);

var _socket = require('./../services/socket');

var _store = require('./../redux/store');

var _store2 = _interopRequireDefault(_store);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var db_url = process.env.DB_URL || 'http://localhost:2389';
var timerInterval = null;

_socket.io.on('connection', function (socket) {
  socket.emit('sendLeagueId');

  socket.on('returnLeagueId', function (data) {

    if (!_store2.default.getState().draftStatus) {
      _store2.default.dispatch(actions.getInitialData(data.league_id));
    }
  });

  var updateView = function updateView(timeObj) {
    _socket.io.emit('timeUpdate', timeObj);
  };

  var draftCharacter = function draftCharacter(pick) {
    if (pick.team_id === _store2.default.getState().currentTeamId.toString()) {
      stopTimer();
      actions.draftCharacter(pick);
      actions.nextTeam();
      actions.initTimer();
      startTimer();
    }
  };

  _store2.default.subscribe(function () {
    var state = _store2.default.getState();

    socket.emit('updateStore', state);

    if (state.autoDraft) {
      actions.resetAutoDraft();

      var char_index = Math.random() * state.characterIds.length | 0;

      var pick = {
        team_id: state.currentTeamId.toString(),
        char_id: state.characterIds[char_index]
      };

      draftCharacter(pick);
    }

    if (state.draftStatus === 'POST_DRAFT' && state.timer.timerIsRunning) {
      stopTimer();
      var url = db_url + '/api/draft/' + state.league.league_id;
      console.log(url);
      _request2.default.post(url, { league_id: state.league.league_id, teams: state.teams });
      // let options = {
      //   host: `${db_url}/api/draft/:draftId`,
      //   method: 'POST',
      //   data: {league_id:state.league.league_id,teams: state.teams}
      // };
    }
  });

  var startTimer = function startTimer() {
    timerInterval = setInterval(actions.decrementTimer, 1000);
    actions.startTimer();
  };

  var stopTimer = function stopTimer() {
    clearInterval(timerInterval);
    actions.stopTimer();
  };

  socket.on('startDraft', function () {
    actions.startDraft();
    actions.initTimer();
    startTimer();
  });

  socket.on('startTimer', function () {
    stopTimer();
    actions.initTimer();
    startTimer();
  });

  socket.on('stopTimer', function () {
    stopTimer();
  });

  socket.on('init', function (data) {
    actions.teamLogOn(data);
  });

  socket.on('draftCharacter', function (pick) {
    draftCharacter(pick);
  });

  socket.on('reset', function () {
    var id = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];

    _store2.default.dispatch(actions.getInitialData(id));
    stopTimer();
  });

  socket.on('moose', function () {
    console.log('moose');
    socket.emit('lemur');
  });
});