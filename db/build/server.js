'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import {db_host,db_port} from './../config';
var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
  extended: true
}));

app.post('/api/draft/:league_id', function (req, res) {
  console.log('league_id: ', req.params.league_id);
  console.log('results: \n', req.body);
  res.send('got it!');
});

app.get('/api/draft/:draftId', function (req, res) {
  console.log(req.params);
  res.send({
    "league": {
      "league_id": 1,
      "teams": [{
        "id": 1534
      }, {
        "id": 3047
      }, {
        "id": 1375
      }, {
        "id": 8385
      }]
    },
    "characters": [{ "char_id": 0 }, { "char_id": 1 }, { "char_id": 2 }, { "char_id": 3 }, { "char_id": 4 }, { "char_id": 5 }, { "char_id": 6 }, { "char_id": 7 }, { "char_id": 8 }, { "char_id": 9 }, { "char_id": 10 }, { "char_id": 11 }, { "char_id": 12 }, { "char_id": 13 }, { "char_id": 14 }, { "char_id": 15 }, { "char_id": 16 }, { "char_id": 17 }, { "char_id": 18 }, { "char_id": 19 }, { "char_id": 20 }, { "char_id": 21 }, { "char_id": 22 }, { "char_id": 23 }, { "char_id": 24 }, { "char_id": 25 }, { "char_id": 26 }, { "char_id": 27 }, { "char_id": 28 }, { "char_id": 29 }, { "char_id": 30 }, { "char_id": 31 }, { "char_id": 32 }, { "char_id": 33 }, { "char_id": 34 }, { "char_id": 35 }, { "char_id": 36 }, { "char_id": 37 }, { "char_id": 38 }, { "char_id": 39 }, { "char_id": 40 }, { "char_id": 41 }, { "char_id": 42 }, { "char_id": 43 }, { "char_id": 44 }, { "char_id": 45 }, { "char_id": 46 }, { "char_id": 47 }, { "char_id": 48 }, { "char_id": 49 }, { "char_id": 50 }, { "char_id": 51 }, { "char_id": 52 }, { "char_id": 53 }, { "char_id": 54 }, { "char_id": 55 }, { "char_id": 56 }, { "char_id": 57 }, { "char_id": 58 }, { "char_id": 59 }, { "char_id": 60 }, { "char_id": 61 }, { "char_id": 62 }, { "char_id": 63 }, { "char_id": 64 }, { "char_id": 65 }, { "char_id": 66 }, { "char_id": 67 }, { "char_id": 68 }, { "char_id": 69 }, { "char_id": 70 }, { "char_id": 71 }, { "char_id": 72 }, { "char_id": 73 }, { "char_id": 74 }, { "char_id": 75 }, { "char_id": 76 }, { "char_id": 77 }, { "char_id": 78 }, { "char_id": 79 }, { "char_id": 80 }, { "char_id": 81 }, { "char_id": 82 }, { "char_id": 83 }, { "char_id": 84 }, { "char_id": 85 }, { "char_id": 86 }]
  });
});

app.listen(2389);
console.log('\n  ( GET, api/draft/:draftId ) => {\n\n    {\n      league:{\n        id: NUMBER (corresponding to draftId),\n        users: [\n          {id: NUMBER},\n          .\n          .\n          .\n          {id: NUMBER}\n        ]\n      },\n      characters: [\n        {id: NUMBER},\n        .\n        .\n        .\n        {id: NUMBER}\n      ]\n    }\n\n  }\n');