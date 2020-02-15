const express = require("express");
const compression = require("compression");
const path = require("path");
const app = express();
app.use(compression());
const fs = require("fs");

app.get("/hotels", function(req, res) {
    if (req.query.q) {
        fs.readFile("./db.json", (err, json) => {
            let response = JSON.parse(json);
            response = response
            .filter(item => item.name.toLowerCase().indexOf(req.query.q.toLowerCase()) > -1);
            res.json(response);
        });
    } else {
      fs.readFile("./db.json", (err, json) => res.json(JSON.parse(json)));
    }
});

app.get("/hotel/:id", function(req, res) {
    let response;
    fs.readFile("./db.json", (err, json) => {
        response = JSON.parse(json);
        response = response.filter(item => item.id == req.params.id);
        res.json(response);
    });
});
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(404).send("Something broke!");
});
app.listen(process.env.PORT || 3000);
