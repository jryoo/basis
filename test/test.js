var basis = require('./../index');
var fs = require('fs');

basis.init("jay.ryoo@gmail.com", "kpjaeyoung181", function(error, response, body) {
    basis.pysData('2014-03-20', undefined, function(error, response, body) {
        fs.writeFile("./test/tmp/test.txt", body, function(err) {

        });
    });
});
