/*********************************************************
 * Author: Akhil Acharya (/u/AkhilCAcharya, @AkhilCAcharya)
 * Date Started: 3/8/2014
 * Description: Future Reddit Library/API Wrapper on Node.js
 **********************************************************/

var request = require('request');
var querystring = require('querystring');

var cookie;
var modHash;

var Reddit = function(useragent) {
    this.useragent = useragent;
    this.endpoints = {
        login: "https://ssl.reddit.com/api/login/?",
        general: "http://api.reddit.com/",
        comment: "https://en.reddit.com/api/comment?"
    };
}

Reddit.prototype.login = function(username, password, done) {

    var query = {
        user: username,
        passwd: password,
        api_type: "json",
        rem: true
    };

    var options = {
        url: this.endpoints.login + querystring.stringify(query),
        headers: {
            "User-Agent": this.useragent,
        },
        method: "POST",
    }

    request(options, function(err, response, body) {
        if (err || response.statusCode != 200) {
            done(err);
            throw err;
        } else {
            cookie = JSON.parse(body).json.data.cookie;
            modHash = JSON.parse(body).json.data.modhash;
            done(null);
        }
    });
}


Reddit.prototype.get = function(subreddit, done) {
    var url = this.endpoints.general + subreddit; // + ".json";
    
    var options = {
        url: url,
        headers: {
            "User-Agent": this.useragent,
            "X-Modhash": modHash,
            "Cookie": "reddit_session=" + encodeURIComponent(cookie),
        },
        method: "GET",
    };

    request(options, function(err, response, body) {
        if (err || response.statusCode != 200) {
            done(err, null);
            throw err;
        } else {
            done(null, JSON.parse(body).data.children);
        }
    });
}

Reddit.prototype.comment = function(comment, data, done) {

    var thing_id = "t1_";

    if (data.comment) {
        thing_id += data.comment.data.id;
    } else if (data.thing_id) {
        thing_id += data.thing_id;
    }

    var query = {
    	api_type: "json",
        text: comment,
        thing_id: thing_id,
    };

    var url = this.endpoints.comment + querystring.stringify(query);

    var options = {
        url: url,
        headers: {
            "User-Agent": this.useragent,
            "X-Modhash": modHash,
            "Cookie": "reddit_session=" + encodeURIComponent(cookie),
        },
        method: "POST",
    };

    request(options, function(err, response, body) {
        if (err || response.statusCode != 200) {
            done(err, null);
            throw err;
        } else {
            done(null, body);
        }
    }); 
};


module.exports = Reddit;
