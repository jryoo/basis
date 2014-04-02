var request = require('request');
var basis = require('./../index');

var requestOptions = {
    url: 'https://app.mybasis.com/login',
    method: 'POST',
    encoding: null,
    json: {"next": "https://app.mybasis.com", "username": "jay.ryoo@gmail.com", "password": "kpjaeyoung181", "submit": "Login"}
}

request(requestOptions, function(error, response, body) {
    console.dir(response.headers['set-cookie']);
    console.dir(cookieParser.parse(response.headers['set-cookie'][0]));
});