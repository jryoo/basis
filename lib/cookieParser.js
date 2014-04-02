(function() {

    var encode = encodeURIComponent;
    var decode = decodeURIComponent;

    // ACKNOWLEDGE(@defunctzombie/node-cookie/index.js)
    var parse = function(str, opt) {
        opt = opt || {};
        var obj = {}

        var pairs = str.split(/; */);
        var dec = opt.decode || decode;

        pairs.forEach(function(pair) {
            var eq_idx = pair.indexOf('=')

            // skip things that don't look like key=value
            if (eq_idx < 0) {
                return;
            }

            var key = pair.substr(0, eq_idx).trim()
            var val = pair.substr(++eq_idx, pair.length).trim();

            // quoted values
            if ('"' == val[0]) {
                val = val.slice(1, -1);
            }

            // only assign once
            if (undefined == obj[key]) {
                try {
                    obj[key] = dec(val);
                } catch (e) {
                    obj[key] = val;
                }
            }
        });

        return obj;
    };

    var cookieParser = {
        parse: parse
    }

    // Export the cookieParser object for Node.js
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = cookieParser;
        }
        exports.cookieParser = cookieParser;
    }

    return cookieParser;

}).call(this);