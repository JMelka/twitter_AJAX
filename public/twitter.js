'use strict'


//AJAX request
var submitButton = document.getElementById("submitButton");


submitButton.onclick = function (event) {
    //event.preventDefault();
        var name = document.getElementById("name");
        var password = document.getElementById("password");

        //login(name.value);
        createUser(name.value, password.value);

};

function login(name) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);
            printUserId(data);
        }
    };

    xhttp.open("GET", "/userId/" + name, true);
    xhttp.send();
}

var sr = document.getElementById("searchResults");

function printUserId(user) {
    sr.innerHTML = "<b>User Id:  </b>" + user.userId;

}

function createUser(name, password) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);
            //printNewUser(data);
        }
    };

    xhttp.open("POST", "/insertUser/" + name + "/"+ password, true);
    xhttp.send();
}

// function printNewUser(user) {
//     sr.innerHTML = "<b>User Id:  </b>" + user.userId;

// }




