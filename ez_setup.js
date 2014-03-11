/*********************************************************
 * Author: Akhil Acharya (/u/AkhilCAcharya, @AkhilCAcharya)
 * Date Started: 3/8/2014
 * Description: Setup wizard for Reddit bot. 
 * Directly alters the config.json in the root directory. 
 **********************************************************/

var fs = require('fs');

var readline = require('readline');
var reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

var path = "./config.json";
var config = require(path);


var ez_setup = {
    initialize: function() {
        console.log("Howdy, and welcome to ez_setup! To quit, simply press Ctrl+C\n\nPlease enter a number!\n");
        this.query();
    },

    query: function() {
        reader.question("Would you like to...\n[1] Add your Username\n[2] Add your password\n[3] Add your user agent or\n[4] Set a delay (in seconds) \n[5] Add an search term.\n\n\n", function(answer) {
                var selection = parseInt(answer);
                //Check if number
                if (!isNaN(selection) && ez_setup.utils.isBetween(selection, 1, 5)) {
                    switch (selection) {
                        case 1:
                            ez_setup.setUsername();
                            break;
                        case 2:
                            ez_setup.setPassword();
                            break;
                        case 3:
                            ez_setup.setUserAgent();
                            break;
                        case 4:
                            ez_setup.setDelay();
                            break;
                        case 5:     
                            ez_setup.addEntry();
                            break;
                    }
                } else {
                    console.log("Hmm..appears to not be a number. Be sure to enter a number from 1 to 4.");
                    ez_setup.query();
                }
            });
    },

    setUsername: function() {

        if (config.username == "") {
            console.log("Hmm..appears you have no username set.");
        } else {
            console.log("Your Username is.." + config.username);
        }

        reader.question("What would you like to set your username to?\n", function(answer) {
            if (answer != "") {
                config.username = answer;
                console.log("\nCool! Your new username is " + config.username + "\n\n");
                fs.writeFile(path, JSON.stringify(config), function(err) {
                    if (err) {
                        console.log("Uh oh! We've got an error in saving. Try again!");
                    }
                    ez_setup.query();
                });
            } else {
                console.log("Whups! Looks like you didn't enter anything. Lets try again.");
                ez_setup.query();
            }
        });
    },

    setPassword: function() {

        if (config.password == "") {
            console.log("Hmm..appears you have no password set.");
        } else {
            console.log("Your password is.. " + config.password);
        }

        reader.question("What would you like to set your password to?\n", function(answer) {

            if (answer != "") {
                config.password = answer;
                console.log("\nCool! Your new password is " + config.password + "\n\n");
                fs.writeFile(path, JSON.stringify(config), function(err) {
                    if (err) {
                        console.log("Uh oh! We've got an error in saving. Try again!");
                    }
                    ez_setup.query();
                });

            } else {
                console.log("Whups! Looks like you didn't enter anything. Lets try again.");
                ez_setup.query();
            }

        });
    },

    setUserAgent: function() {

        if (config.useragent == "") {
            console.log("Hmm..appears you have no useragent set.");
        } else {
            console.log("Your useragent is.. " + config.useragent);
        }

        reader.question("What would you like to set your useragent to?\n", function(answer) {

            if (answer != "") {

                config.useragent = answer;
                console.log("\nCool! Your new useragent is " + config.useragent + "\n\n");
                fs.writeFile(path, JSON.stringify(config), function(err) {
                    if (err) {
                        console.log("Uh oh! We've got an error in saving. Try again!");
                    }
                    ez_setup.query();
                })

            } else {
                console.log("Whups! Looks like you didn't enter anything. Lets try again.");
                ez_setup.query();
            }
        });

    },

    setDelay: function() {
        if (!config.delay) {
            console.log("Hmm..appears you don't have a delay set!");
        } else {
            console.log("Your current delay is:  " + config.delay / 1000 + " seconds");
        }

        reader.question("What would you like your delay to be, in seconds?\n", function(answer) {
            answer = parseInt(answer);
            if (!isNaN(answer) && answer > 2) {
                config.delay = answer * 1000;
                console.log("\nNice! Your new delay is " + answer + " seconds\n\n");
                fs.writeFile(path, JSON.stringify(config), function(err) {
                    if (err) {
                        console.log("Uh oh! We've got an error in saving. Try again!");
                    }
                    ez_setup.query();
                });

            } else {
                console.log("Whups! Looks like you didn't enter a valid number, or your number was less than 2. Lets try again.");
                ez_setup.query();
            }
        });

    },

    addEntry: function() {
        if (config.entries.length == 0) {
            console.log("Hmm..appears you don't have any query entries");
        } else {
            console.log("Your current entries are...\n" + config.entries.join(",\n"));
        }

        reader.question("What would you like to add to your query entries?\n", function(answer) {
            if (answer != "") {
                config.entries.push(answer);
                console.log('\nCool! Your new addition is "' + answer + '"\n\n');
                fs.writeFile(path, JSON.stringify(config), function(err) {
                    if (err) {
                        console.log("Uh oh! We've got an error in saving. Try again!");
                    }
                    ez_setup.query();
                });

            } else {
                console.log("Whups! Looks like you didn't enter anything. Lets try again.");
                ez_setup.query();
            }
        });
    },

    utils: {
        isBetween: function(num, min, max) {
            return num >= min && num <= max;
        }
    }

}


ez_setup.initialize();
