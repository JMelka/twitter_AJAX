'use strict'
//var express = require('express');
//var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('Twitter.db');

//var Promise = require('promise');


//initDB(db);

function initDB() {
    db.serialize(function () {
        //User table
        db.run("CREATE TABLE User (Name TEXT, Profile TEXT, Password TEXT, LoginName TEXT)");

        //Tweet table
        db.run("CREATE TABLE Tweet (UserId INT, Msg TEXT, Insrt_TS DATETIME DEFAULT CURRENT_TIMESTAMP)");

        //Following table
        db.run("CREATE TABLE Following (Follower INT, Followee INT)");

        //Like table
        db.run("CREATE TABLE Like (UserId INT, TweetId INT)");

    });
}

function insertTweet(userName, msg) {
    //db.each("SELECT rowid as Id FROM User where Name = 'John'", function (err, row) {
    var stmt = "SELECT rowid as Id FROM User where Name = ?";
    db.each(stmt, userName, function (err, row) {
        if (err) {
            console.log(err);
        } else {
            var stmt = db.prepare("INSERT INTO Tweet (UserId, Msg) VALUES (?, ?)");
            stmt.run(row.Id, msg);
            stmt.finalize();
        }
    });

}

function getTweets(userId) {
    return new Promise(function (resolve, reject) {
        var stmt = "SELECT rowid as Id, Msg as Msg, Insrt_TS as Date FROM Tweet where UserId = ?";
        db.each(stmt, userId, function (err, rows) {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
}

// function updateTweet(db){

// }

// function deleteTweet(db){

// }

function insertUser(name, profile, password, loginName) {
    //name = JSON.parse(name);
    //profile = JSON.parse(profile);
    
    var stmt = db.prepare("INSERT INTO User (Name, Profile, Password, LoginName) VALUES (?, ?, ?, ?)");
    
    stmt.run(name, profile, password, loginName, function (err) {
        // this.lastID
    });
    stmt.finalize();
}

function getUser() {
    return new Promise(function (resolve, reject) {
        db.all("SELECT rowid as Id, Name AS Name FROM User", function (err, rows) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log(rows);
                resolve(rows);
            }
        });
    });

}

function getUserId(userName, cb) {
    var stmt = "SELECT rowid as Id FROM User where Name = ?";
    db.each(stmt, userName, function (err, row) {
        if (err) {
            console.log(err);
            return cb(err);
        } else {
            console.log("RowId = " + row.Id);

            var userId = row.Id;
            //var msg = 'Hello';
            console.log("UserId = " + userId);
            return cb(null, userId);
        }
    });
}


function updateUser(name, loginName){
    var stmt = db.prepare("Update User Set Name = ? where LoginName = ?");
    stmt.run(name, loginName);
    stmt.finalize();
}

// function deleteUser(db){

// }

function insertFollowing(follower, followee){
    var stmt = db.prepare("INSERT INTO Following (Follower, Followee) VALUES (?, ?)");
    stmt.run(follower, followee);
    stmt.finalize();
}

function insertLike(userId, tweetId){
    var stmt = db.prepare("INSERT INTO Like (UserId, TweetId) VALUES (?, ?)");
    stmt.run(userId, tweetId);
    stmt.finalize();
}


//db.close();
exports.initDB = initDB;
exports.insertUser = insertUser;
exports.insertTweet = insertTweet;
exports.getUserId = getUserId;
exports.updateUser = updateUser;


//wrapping in transactions.
// function updateAnyColumnWithExistingData(columnName, tweetid, userid) {
//    var p;
//    db.beginTransaction(function (err, transaction) {
//        p = new Promise((resolve, reject) => {
//            transaction.each("SELECT " + columnName + " FROM tweet where tweetid = ?", tweetid, function (err, row) {
//                if (err) {
//                    console.log(err);
//                    reject(err);
//                }
//                resolve(row)
//                console.log("updateAnyColumnWithExistingData:" + row[columnName]);
//            })
//        }).then(
//            (row) => {
//                return updateUserIds(transaction, columnName, row[columnName], tweetid, userid);
//            }
//            ).then(
//            (row) => {
//                if (columnName == "retweeter_userid") {
//                    return updateRetweetBool(transaction, tweetid);
//                }
//            }
//            ).then(
//            (val) => {
//                transaction.commit(function (err) {
//                    console.log("Commit Successful!");
//                });
//            }
//            ).catch(
//            (err) => {
//                console.log("Rollback: " + err);
//                transaction.rollback();
//            }
//            );
//    });
//    return p;

// }


// function updateUserIds(db, columnName, existingUsers, tweetid, userid) {
//    console.log("updateUserIds: " + columnName + "::" + existingUsers + "::" + tweetid + "::" + userid);
//    return new Promise(
//        (resolve, reject) => {
//            console.log("updateUserIds: " + existingUsers);
//            var finalUserids = existingUsers != null && existingUsers != "" ? existingUsers + ":" + userid : userid;
//            console.log("updateUserIds after adding new user : " + finalUserids);
//            db.run("UPDATE tweet SET " + columnName + " = ? WHERE tweetid = ?", finalUserids, tweetid, function (err) {
//                if (err) {
//                    console.log(err);
//                    reject(err);
//                }
//                else {
//                    console.log("Successful Update updateUserIds.");
//                    resolve();
//                }
//            });
//        });
// }


// function updateRetweetBool(db, tweetid) {
//    return new Promise(
//        (resolve, reject) => {
//            console.log("updateRetweetBool tweetid: " + tweetid);
//            db.run("UPDATE tweet SET retweet= ? WHERE tweetid = ?", 1, tweetid, function (err) {
//                if (err) {
//                    console.log(err);
//                    reject(err);
//                }
//                else {
//                    console.log("Successful Update userlikeids.");
//                    resolve();
//                }
//            });
//        });
// }