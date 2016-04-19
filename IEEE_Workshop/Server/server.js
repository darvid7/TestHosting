/**
 * Created by David on 30/03/2016.
 */

var express = require('express');           // go into node modules and find the express folder
var bodyParser = require('body-parser');
var Nedb = require('nedb');


var app = express();                        // remember the ()

app.use(bodyParser.json());                 // everything gets passed through .use

app.use(express.static('../client'));       // sit and waits for requests

// . means this folder then data then data.db
var database = new Nedb ({filename: './data/data.db', autoload: true});

app.get('/getSaved', function (req,res) {
    // setup query & done function here
    var query = {}
    var done = function (err,data) {
        console.log("I just read stuff from the database")
        res.send(data)

    };
    // does work here, find the query and run done
    database.find(query, done)
});

// accept info from client via this post, if someone posts to this section of the site
// localhost:8080/saveCurrent will go to here
app.post('/saveCurrent', function(req, res){        // req = info sent from webapp, has ip, time, date, data etc access via dot
    // req.data
    // response, wha twe will send back
    //res.send();
    var data = {
            word: req.body.word,
            data: Date.now()
        };

    var done = function() {
        console.log("I just wrote to the database");
        res.end("done")
    };
    database.insert(data, done)
});




var port = 8080;
app.listen(port);
console.log("server starting up")
console.log("listening on port: " + port);

// note: any db is like mongo db but just stores your fils in a txt file