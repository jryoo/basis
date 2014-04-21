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

    var getProfile = function(callback) {

        var requestOptions = {
            url: 'https://app.mybasis.com/api/v1/user/me.json',
            method: 'GET',
            headers: headers
        };


        request(requestOptions, function(error, response, body) {
            body = JSON.parse(body);
            if (!error) {
                id.me = body;
                id.first_name = body.profile.first_name;
                id.last_name = body.profile.last_name;
                id.full_name = body.profile.full_name;
                id.email = body.email;
                id.joined = body.profile.joined;
                id.level = body.level;
                id.id = body.id;
                id.device = body.device;
                id.last_synced = body.last_synced;
                id.anatomy = body.anatomy;
            }

            callback(error, response, body, id);
        });
    }

    var init = function(username, password, callback) {
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
                    "X-Basis-Authorization": "OAuth "+ tokens.access.access_token
                }
            }
            callback(error, body);
        });

    }

    var getPoints = function(callback) {
        var requestOptions = {
            url: 'https://app.mybasis.com/login',
            method: 'POST',
            encoding: null,
            json: {"next": "https://app.mybasis.com", "username": id.username, "password": id.password, "submit": "Login"}
        }
    }

    var pysData = function(startDate, endDate, callback) {
        if (endDate) {

        } else {
            var url = 'https://app.mybasis.com/api/v1/chart/me?' +
                'summary=true' + '&interval=60' + '&units=ms' + '&start_offset=0' +
                '&end_offset=0' + '&heartrate=true' + '&steps=true' + '&calories=true' + 
                '&gsr=true' + '&skin_temp=true' + '&air_temp=true' + '&bodystates=true';
            url = url + '&start_date=' + startDate;
            var requestOptions = {
                url: url,
                method: 'GET',
                headers: headers        
            }
            request(requestOptions, function(error, response, body) {
                callback(error, body);
            })
        }
    }

    var basis = {
        init: init,
        getProfile: getProfile,
        pysData: pysData
    }

    return basis;

}).call(this);

