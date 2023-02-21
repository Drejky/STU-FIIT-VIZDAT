const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.static('public'));

app.get('/', function (req, res, next) {
  res.sendFile('index.html');
});

// app.get('/src/three.js', (req, res, next) => {
//   res.sendFile(__filename);
// });

app.listen(process.env.PORT, function () {
  console.log(`CORS-enabled web server listening on ${process.env.PORT}`);
});
