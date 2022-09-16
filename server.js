/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Paulina Broni Student ID: 154548192 Date: Thursday, September 15, 2022
* Cyclic Link: _______________________________________________________________
*
********************************************************************************/

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var cors = require("cors");
var dotenv = require("dotenv").config();
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();


app.use(cors());
app.use(express.json());
// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    res.json({message:"API Listening"});
});


app.post("/api/movies", function(req,res){

    db.addNewMovie(req.body)
    .then((data)=>{
        res.json(data);
   
})
.catch((err) => {
    res.status(400).json(err);
    });
});

app.get("/api/movies", (req,res)=>{
    db.getAllMovies(req.query.page, req.query.perPage, req.query.title)
    .then(data=>{
        res.json(data);
    })
    .catch((err)=>{
        res.status(500).json({message:err.message});
    })
 });

app.get("/api/movies/:id", function(req,res){
 db.getMovieById(req.params.id).then(data=>{
    res.json(data);
 })
 .catch((err)=>{
    res.status(500).json({message:err.message});
    })
});

app.put("/api/movie/:id", function(req,res){
db.updateMovieById(req.body, req.params.id)
.then(() => {
    res.status(200).json(`movie ${req.body._id} successfully updated`);
})
.catch((err) => {
    res.status(404).json(err);
});
});

app.delete("/api/movies/:id", function(req,res){
    myData.deleteMovieById(req.params.id)
    .then(() => {
        res.status(200).json(`movie ${req.params.id} successfully deleted`);
    })
    .catch((err) => {
        res.status(404).json(err);
    });
});
// setup http server to listen on HTTP_PORT

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`);
    });
    }).catch((err)=>{
    console.log(err);
    });
