const { NODE_ENV = "development" } = process.env;
const express = require("express");
const app = express();

// middleware
const validateZip = require("./middleware/validateZip");
const getZoos = require("./utils/getZoos");

//routes
app.get("/check/:zip", validateZip, (req, res, next) => {
    const zip = req.params.zip;
    if (getZoos(zip)) {
        res.send(`${zip} exists in our records.`);
    } else {
        res.send(`${zip} does not exist in our records.`);
    }
});


app.get("/zoos/all", (req, res, next) => {
    const admin = req.query.admin;
    if (admin === "true") {
        res.send(`All zoos: ${getZoos().join("; ")}`);
    } else {
        res.send("You do not have access to that route.");
    }
});

app.get("/zoos/:zip", validateZip, (req, res, next) => {
    const zip = req.params.zip;
    let zoos = getZoos(zip);
    if (zoos.length) {
        res.send(`${zip} zoos: ${zoos.join("; ")}`);
    } else {
        res.send(`${zip} has no zoos.`);
    }
});


app.use((req, res, next) => {
    res.send("That route could not be found!");
});

app.use((error, req, res, next) => {
    res.send(error);
});

module.exports = app;
