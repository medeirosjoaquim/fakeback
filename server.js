const express = require("express");
const compression = require("compression");
const path = require("path");
const app = express();
app.use(compression());
const fs = require('fs');

app.get('/hotels', function(req, res) {
fs.readFile('./db.json', (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(404).send('Something broke!');
});
app.listen(process.env.PORT || 3000);