'use strict'

var dbFile = require('./db');

var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var Promise = require('promise');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//app.use(express.static('public'));
app.use('/static', express.static(__dirname + "/public"));


//Get User Id
app.get('/twitter.html', function (req, res) {
   res.sendFile( __dirname + "/" + "twitter.html" );
})

app.get('/userId/:name', urlencodedParser, function (req, res) {

    dbFile.getUserId(req.params.name, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("TheUserId: " + result);

            res.send({ userId: result });


        }

    });

})


app.post('/insertUser/:name/:password', urlencodedParser, function (req, res) {

    dbFile.insertUser(req.params.name, 'testprofile', req.params.password, 'testloginName');

    res.send({userName: req.params.name});
})

app.post('/insertTweet/:name/:message', urlencodedParser, function (req, res) {

    dbFile.insertTweet(req.params.name, req.params.message);

    res.send({userName: req.params.name, tweet: req.params.message});
})

app.get('/getTweets/:userId', function (req, res) {
    var id = req.params.userid;
    var tweets = {};
    //var tweets = dbFile.getTweets(id);
    res.send({tweets});
        dbFile.getTweets(id).then(
        (tweets) => {
            res.send(tweets);
        }
    ).catch(
        (err) => {
            res.status(500);
            res.send('getTweets error: issue getting Tweets');
        }
    );
})


var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);

})



//Create database
//dbFile.initDB();

//Insert User
//dbFile.insertUser('John', 'JMelka', 'ABC123', 'JMelka@Test.com');
//dbFile.insertUser('Haritha', 'Haritha_Profile', 'ABC123', 'Haritha@Test.com');

// //Insert Tweet
// dbFile.insertTweet('John', 'Hello World');
// dbFile.insertTweet('Haritha', 'Hello World 2');

// dbFile.updateUser('JOHN', 'JMelka@Test.com');

// var userId = 20;

// //get user id
// dbFile.getUserId('John', cbUserId);





