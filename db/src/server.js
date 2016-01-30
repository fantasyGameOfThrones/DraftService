import express from 'express';
import bodyparser from 'body-parser';
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({   
  extended: true
})); 

app.post('/api/draft/:league_id', (req, res) => {
  console.log('league_id: ', req.params.league_id);
  console.log('results: \n', req.body);
  res.send('got it!');
});

app.get('/api/draft/:draftId', (req, res) => {
  console.log(req.params);
  res.send(
    {
      "league": {
        "league_id": 1,
        "users": [
          {
            "id": 1534
          },
          {
            "id": 3047
          },
          {
            "id": 1375
          },
          {
            "id": 8385
          }
        ]
      },
      "characters": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48,
        49,
        50,
        51,
        52,
        53,
        54,
        55,
        56,
        57,
        58,
        59,
        60,
        61,
        62,
        63,
        64,
        65,
        66,
        67,
        68,
        69,
        70,
        71,
        72,
        73,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        82,
        83,
        84,
        85,
        86
      ]   
    }

  );
});

app.listen(2389);

// console.log(`
//   ( GET, api/draft/:draftId ) => {

//     {
//       league:{
//         id: NUMBER (corresponding to draftId),
//         users: [
//           {id: NUMBER},
//           .
//           .
//           .
//           {id: NUMBER}
//         ]
//       },
//       characters: [
//         {id: NUMBER},
//         .
//         .
//         .
//         {id: NUMBER}
//       ]
//     }

//   }
// `);
