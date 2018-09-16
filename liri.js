
require('dotenv').config();
var inquirer = require("inquirer");
var request = require("request");
var bandsintown = require('bandsintown')('app_id=' + bandsinTownApi);
var fs = require("fs");
var apiKey = require("./keys.js");
var bandsinTownApi = require("./keys.js");


//======================================================================
inquirer 
.prompt([
    {
        type: "list",
        message: "Choose a command: ",
        choices: ["concert-this","spotify-this-song","movie-this","do-what-it-says"],
        name: "commands"
    },
    {
        type: "input",
        message: "Input a Title/Song/Band of interest: ",
        name: "title"
    }
])

.then(function(inquirerResponse)
{
//============================BANDS IN TOWN =================================================
    if (inquirerResponse.commands === "concert-this") { function bandsInTownFunction(){

            if ( inquirerResponse.title == ""){
                console.log("\nTry typing an artist/band name. \n")
            }
            else {
                 artistName = inquirerResponse.title;
            
                    bandsintown.getArtistEventList(artistName).then(function(events) {
            console.log(JSON.stringify(events, null, 2));
            fs.appendFile("log.txt", "\n" + inquirerResponse.commands +" " + inquirerResponse.title, function(err) {
                if (err) {
                    return console.log(err);
                  }
                  console.log("movies.txt was updated!");
            
                });
          });
        }
    }
    bandsInTownFunction(); 
    }
    
//==========================SPOTIFY=====================================================    
    else if (inquirerResponse.commands === "spotify-this-song") { 
        console.log(inquirerResponse.commands)
        spotify = require("./spotify")
        //Using access token, send actual inquirerResponse.title value to spotify Api
        //Receive response, parse JSON data into usable, readable portion.
    }
//=======================OMDB API Call=====================================================
    else if (inquirerResponse.commands === "movie-this") { 
        
             if (inquirerResponse.title == "") 
             { 
                queryUrl = "http://www.omdbapi.com/?t=mr" + " "+ "nobody&y=&plot=short&tomatoes=true" + apiKey;
             }
            else 
            {
                var queryUrl = "http://www.omdbapi.com/?t=" + inquirerResponse.title + "&y=&plot=short&tomatoes=true" + apiKey ;
            }
                request(queryUrl, function(error, response, body) 
                {
                    if (!error && response.statusCode === 200) 
                    {
                        console.log("\nTitle: " + JSON.parse(body).Title);
                        console.log("Release Year: " + JSON.parse(body).Year);
                        console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                        // console.log("Rotten Tomato Rating: " + JSON.parse(body).tomatoMeter)
                        console.log("Language: " + JSON.parse(body).Language);
                        console.log("Plot: " + JSON.parse(body).Plot);
                        console.log("Actors: " + JSON.parse(body).Actors);
                        console.log("Country: " + JSON.parse(body).Country);
                            fs.appendFile("log.txt", "\n" + inquirerResponse.commands +" " + inquirerResponse.title, function(err) {
                            if (err) {
                                return console.log(err);
                              }
                              console.log("movies.txt was updated!");
                            });
                    }
                });
            
    }          
//==============================Imported File==============================================================
    else if (inquirerResponse.commands === "do-what-it-says") {
        console.log("\nPsych, Joke is on you, this command does what it wants!")
        fs.readFile("random.txt", "utf8", function(error, data) {
            if (error) {
                return console.log(error);
            }
            var dataArr = data.split(","); 
            // var dataArrUsable = JSON.parse(data);
            inquirerResponse.commands = dataArr[0];
            inquirerResponse.title = dataArr[1];
            console.log(inquirerResponse.commands);
 //==================================================================================           
            if (inquirerResponse.commands === "concert-this") {
                bandsInTownFunction()}
            else if (inquirerResponse.commands === "spotify-this"){}
            else {}
            
            var dataArrObj = [inquirerResponse.commands,inquirerResponse.title]
            inquirerResponse;
            console.log(inquirerResponse.title);
                
            
            
            fs.appendFile("log.txt", "\n" + inquirerResponse.commands +" " + inquirerResponse.title, function(err) {
                if (err) {
                    return console.log(err);
                  }
                  console.log("movies.txt was updated!");
            
                });
        });
    }
});

