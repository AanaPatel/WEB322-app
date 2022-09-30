/*********************************************************************************
 *  WEB322 - Assignment 02
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source
 *  (including 3rd party web sites) or distributed to other students.
 *
 *  Name: Ananta Kirankumar Patel 
 *  Student ID:  145437216
 *  Date: 30/09/2022
 *
 *  Online (Cyclic) Link: 
 *
 ********************************************************************************/



var express = require("express");
const { resolve } = require("path");
var app = express();
var path = require("path");
var data = require("./data-service.js");


var HTTP_PORT = process.env.PORT || 8080;

app.use(express.static("public/css"));


function onHTTPStart() {
  console.log("Express http server listening on port " + HTTP_PORT);
}


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/home.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/about.html"));
});

app.get("/students", (req, res) => {
  data
    .getAllStudents()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ Message: "Error" });
    });
});

app.get("/intlstudents", (req, res) => {
  data
    .getInternationalStudents()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ Message: "Error" });
    });
});

app.get("/programs", (req, res) => {
  data
    .getPrograms()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ Message: "Error" });
    });
});

app.use((req, res) => {
  res
    .status(404)
    .send(
      "<h1>Error 404. Page Not Found.</h1><img alt='Image cannot be shown.'/>"
    );
});


data
  .initialize()
  .then(() => {
    app.listen(HTTP_PORT, onHTTPStart);
  })
  .catch((err) => {
    console.log("Error.");
  });