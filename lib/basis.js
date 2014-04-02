//      Basis.js 0.0.1
//      http://www.github.com/jryoo/Basis

var request = require('request');
var cookieParser = require('./cookieParser');

module.exports = 
(function() {
    var id = {
        username: null,
        password: null,
        me: null,
        points: null,
        first_name: null,
        last_name: null,
        full_name: null,
        email: null,
        joined: null,
        level: null,
        id: null,
        device: null,
        last_synced: null,
        anatomy: null
    }

    var tokens = {
        access: null,
        refresh: null
    }

    var headers = null;

    var getProfile = function() {


        request(requestOptions, function(error, response, body) {
            tokens.access = cookieParser.parse(response.headers['set-cookie'][0]);
            tokens.refresh = cookieParser.parse(response.headers['set-cookie'][2]);
        });
    }

    var basis = {
        init: function(username, password) {
            id.username = username;
            id.password = password;

            var requestOptions = {
                url: 'https://app.mybasis.com/login',
                method: 'POST',
                encoding: null,
                json: {"next": "https://app.mybasis.com", "username": id.username, "password": id.password, "submit": "Login"}
            }

            request(requestOptions, function(error, response, body) {
                if (error) {
                    return;
                } else {
                    tokens.access = cookieParser.parse(response.headers['set-cookie'][0]);
                    tokens.refresh = cookieParser.parse(response.headers['set-cookie'][2]);
                    headers = {
                        "X-Basis-Authorization": "OAuth "+ tokens.access.acces_token
                    }
                    console.dir(tokens);
                }
            });

        },
        getProfile: getProfile,


    }

    return basis;

}).call(this);

