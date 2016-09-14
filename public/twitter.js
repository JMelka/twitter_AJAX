'use strict'


//AJAX request
var submitButton = document.getElementById("submitButton");
var submitMessage = document.getElementById("submitMessage");

//var name = document.getElementById("name");
//var password = document.getElementById("password");
//var userName = document.getElementById("userName");
//var userId = document.getElementById("userId");
//var message = document.getElementById("message");

submitButton.onclick = function (event) {
    //event.preventDefault();
    var name = document.getElementById("name");
    var password = document.getElementById("password");
    //login(name.value);
    //console.log(name.value);

    createUser(name.value, password.value);

};

submitLogin.onclick = function (event) {
    //event.preventDefault();
    var name = document.getElementById("loginname");
    var password = document.getElementById("loginpassword");
    login(name.value);
    //console.log(name.value);

    //createUser(name.value, password.value);

};

submitMessage.onclick = function (event) {
    //event.preventDefault();
    var userName2 = document.getElementById("userName");
    var message = document.getElementById("message");
    //console.log(message.value);
    //login(name.value);
    insertTweet(userName2.value, message.value);

};


function createUser(name, password) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);

        }
    };

    xhttp.open("POST", "/insertUser/" + name + "/" + password, true);
    xhttp.send();

    login(name);
}

function login(name) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);
            printUserId(data, name);
        }
    };

    xhttp.open("GET", "/userId/" + name, true);
    xhttp.send();
}



function printUserId(user, name) {
    var sr = document.getElementById("searchResults");
    var lr = document.getElementById("loginResults");
    var userName = document.getElementById("userName");

    sr.innerHTML = "<b>User Id:  </b>" + user.userId;
    lr.innerHTML = "<b>User Id:  </b>" + user.userId;
    userName.value = name;

}

function insertTweet(name, message) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);

        }
    };

    xhttp.open("POST", "/insertTweet/" + name + "/" + message, true);
    xhttp.send();

    login(name);
}

// function printNewUser(user) {
//     sr.innerHTML = "<b>User Id:  </b>" + user.userId;

// }




