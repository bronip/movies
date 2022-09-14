/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: ______________________ Student ID: ______________ Date: ________________
* Cyclic Link: _______________________________________________________________
*
********************************************************************************/

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var cors = require("cors");
var dotenv = require("dotenv").config();
var mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    res.json({message:"API Listening"});
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT);