/*********************************************************
 * Author: Akhil Acharya (/u/AkhilCAcharya, @AkhilCAcharya)
 * Date Started: 3/8/2014
 * Description: Reddit bot that responds to overused cliches.
 **********************************************************/

var fs = require('fs');

var path = "./config.json";
var config = require(path);
var _ = require('lodash-node'); 
var moment = require('moment'); 

var Reddit = require('./Reddit');
var Client;

//Bot Object
var Bot = {
    //Initialize Reddit Client
    initialize: function() {
        Client = new Reddit(config.useragent);
        Client.login(config.username, config.password, function(err) {
            if (err) {
                console.log("Error :(\n There's a problem with login. Alter your settings.");
                throw err;
            } else {
                console.log("Logged in!");

                //Setup scanning loop
                setInterval(Bot.scan, config.delay);

                //Run it for the first time
                Bot.scan();
            }
        });
    },

    //Scan for all comments
    scan: function() {
        //Get www.reddit.com/comments.json, and get the latest comment (index of 0)
        Client.get('comments', function(err, comments) {
            if (err) {
                console.log("Uh oh! Couldn't get comments. Will try again on next run through.");
                throw err;
            } else {
                comments.forEach(function(comment) {
                    //Check if the newest comment has already been responded to
                    if (config.history.indexOf(comment.data.parent_id) == -1) {

                        //Debug: Show latest comment 
                        if (config.debug) console.log("\n\nLatest comment: " + comment.data.body + "\nPublished at " + moment(comment.data.created * 1000).format('MMMM Do YYYY, h:mm:ss a') + "id: " + comment.data.id +"\n\n");

                        //Check if the post includes any search terms
                        var response = Bot.utils.postHasItem(comment.data.body); 
                        if (response.length > 0) {
                            //Comment on the post with a random item in the response array
                            Client.comment(config.responses[Math.floor((Math.random() * config.responses.length) + 0)], {
                                comment: comment
                            }, function(err) {
                                if (err) {
                                    console.log("Uh oh! Couldn't comment. Will try again on next run though.");
                                } else {
                                    console.log('Commented on post "' + comment.data.link_title + '" under parent user ' + comment.data.author + "because it contains the phrase: " + response.match +  "\n\n");
                                    Bot.save(comment.data.parent_id);
                                }
                            });
                        }
                    } else {
                        console.log("Looks like you have already responded to this comment. Skipping a turn.");
                    }
                }); 
            }
        });
    },

    //Save comments that have already been responded to by id. 
    save: function(id) {
        //Push to global Config object
        config.history.push(id);
        //Save the entire config object and overwrite. 
        fs.writeFile(path, JSON.stringify(config), function(err) {
            if (err) {
                console.log("Uh oh! We've got an error in saving. Try again!");
            } else {
                console.log("Saved!");
            }
        });
    },

    utils: {
        postHasItem: function(post) {

            //Compare lower case to lower case
            post = post.toLowerCase();

            var responses = []; 

            for(var i = 0; i < config.entries.length; i++){
                var entry = config.entries[i].toLowerCase();
                 if (post.indexOf(entry) != -1) {
                    responses.push({
                        match: entry, 
                    }); 
                }
            }

            //Debug: Show number of query terms in the post itself
            //If > 1, it returns true, as it does have items. 
            if (config.debug && responses.length > 0) console.log("Countains terms " + responses + " query terms\n");

            return responses; 
        }
    },
}

//Start it!

Bot.initialize();



