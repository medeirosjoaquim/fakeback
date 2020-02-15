const express = require("express");
const compression = require("compression");
const path = require("path");
const app = express();
app.use(compression());
const fs = require('fs');

app.get('/hotels', function(req, res) {
fs.readFile('./db.json', 
  (err, json) =>  res.json(JSON.parse(json)));
});

app.get('/hotel/:id', function(req, res) {
  let response;
  fs.readFile('./db.json', 
    (err, json) => {
      response = JSON.parse(json)
      //.filter( item => item.id === req.params.id);
      console.log(req.params.id);
      response = response.filter (item => item.id  == req.params.id)
      res.json(response);
    });
    
  });
  


// app.get('/hotel/:id', function (req, res, next) {
//   let response;
//   fs.readFile('./db.json', 
//   (err, json) => response = (JSON.parse(json)));
//   console.log(response);
//   res.json(response);
// })
  

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(404).send('Something broke!');
});
app.listen(process.env.PORT || 3000);