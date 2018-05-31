var fs = require("fs");
var re = require("dotenv").config();
var keys = require("./keys.js")
var request = require("request");
var express = require("express");
var path = require("path");
//var spotify = require('spotify');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
 var twitter = new Twitter(keys.twitter);
 var params = {screen_name: 'nodejs', count: 20};
    var inputString = process.argv;
    var command = inputString[2];
    var name = "";
        for(var i = 3; i < inputString.length;i++){
            name = name + inputString[i];
        }
    if (command === "my-tweets") {
        tweet(name);
    }
      if (command === "spotify-this-song") {
        song(name);
    }
      if (command === "movie-this") {
          movie(name);
    }
      if (command === "do-what-it-says") {
       doThis(name);
    }
 function doThis (nam){
        fs.readFile("random.txt", "utf8", function(error, data) {
            if (error) {
                return console.log(error);
              }
             var dataArr = data.split(",")
              if (dataArr[0]=== "my-tweets") {
                tweet(dataArr[1]);
              }
              if (dataArr[0] === "spotify-this-song") {
                  console.log("works")
                song(dataArr[1]);
              }
              if (dataArr[0] === "movie-this") {
                  movie(dataArr[1]);
            }
      });
    }
    function movie (nam) {
        if (nam === ""){
            nam = "Mr. Nobody"
        }
      var queryUrl = "http://www.omdbapi.com/?t=" + nam + "&y=&plot=short&apikey=trilogy";
      request(queryUrl, function(error, response, body) {

          // If the request is successful
          if (!error && response.statusCode === 200) {
        
            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("Rating: " + JSON.parse(body).imdbRating);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
          }
    })
    } 
    function tweet (nam) {
        twitter.get('statuses/user_timeline', params, function(error, tweets, response){
            if (!error) {
                for(var i = 0; i <20; i++){
              console.log(tweets[i].text);
              console.log(tweets[i].user.created_at)
                }
            }
          });
        }

    function song (nam){
        if (nam === ""){
            nam = "The Sign by Ace of Base"
        }
        spotify.search({ type: 'track', query: nam })
                .then(function(response) {
                     console.log(response.tracks.items[0].album.artists[0].name);
                     console.log(response.tracks.items[0].name);
                     console.log(response.tracks.items[0].album.artists[0].external_urls.spotify);
                     console.log(response.tracks.items[0].album.name);
                })
                .catch(function(err) {
                     console.log(err);
                });

    }