'use strict'

var db = require('../db');

//var chai = require('chai');

//var assert = chai.assert;

var assert = require('assert');

//chai is nice to use with promises.
// var chai = require('chai');
// var chaiAsPromised = require('chai-as-promised');
// chai.use(chaiAsPromised);
// chai.should();


describe('getUserId test', function () {
    it('should get a valid user id', function (done) {
        var result = db.getUserId('name', function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("TheUserIdTest: " + result);
                assert.equal(2, result);
                
            }
            console.log("valid Result: " + result);
            done();

        });
    });

    it('should not get a valid user id', function (done) {
        var result = db.getUserId('name', function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("TheUserIdTest2: " + result);
                assert.equal(1, result);
                
            }
            console.log("invalid Result: " + result);
            done();

        });
    });

        it('should get another valid user id', function (done) {
        var result = db.getUserId('name', function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("TheUserIdTest3: " + result);
                assert.equal(2, result);
                
            }
            console.log("another valid Result: " + result);
            done();

        });
    });
});





