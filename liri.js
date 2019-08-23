require("dotenv").config();

let keys = require('./keys.js');
let request = require('request');
let moment = require('moment')
let fs = require("fs");
let axios = require("axios");
let Spotify = require("node-spotify-api");
let spotifyKeys = require("./keys.js");
let spotify = new Spotify(spotifyKeys.spotify);

const user = process.argv[2];
const input = process.argv[3];


switch (user){
    case('concert-this'):
    if(input){
        gBands(input)
    }else{

    }
    break;
    
    case('spotify-this-song'):
        if(input){
            spotifyS(input);
        }else{

        } 
        break;
    case('movie-this'):
        if(input){
            movieG(input);
        }else{

        }
        break;
    case('do-what-it-says'):
    if(input){
        whatItSays(input);
    }else{

    }
        break;
    default:
        console.log("Not working, try again please")
        
}

function gBands(input){
       let queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
       axios.get(queryUrl).then(
           function(response){
               for(var i = 0; i < response.data.length; i++){
                   console.log("Concert Venue: " + response.data[i].venue.name);
                   console.log("Concert Location: " + response.data[i].venue.city + "," + response.data[i].country);
                   console.log("Concert Date: " + moment(response.data[i].datetime, 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY, h:mm A'));
                   console.log("\n----------------------------------------------------------\n");
               }
           }
       )
    }

function spotifyS(){
    spotify.search({type: 'track', query: input}, function(error, data){
        if(!error){
            
        
        for(var  i = 0; i < data.tracks.items.length; i++){
            let music = data.tracks.items[i];
            
            console.log("artist: "  + music.artist[0].name);
            console.log("song name: " + music.name);
            console.log("preview: " + music.preview_url);
            console.log("album: " + music.album.name);
            console.log("\n------------------------------------------------\n");
        }
        }else{
            console.log("ERROR!!" + error);
            return;
        }
    });
};

function movieG(input){
    
    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&tomatoes=true&apikey=trilogy";
    request(queryUrl, function(error, response, body){
        if(!error && response.statusCode == 200){
            var body = JSON.parse(body);
            console.log("Title: " + body.Title);
            console.log("Year: " + body.Year);
            console.log("IMDB Rating: " + body.imdbRating);
            console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
            console.log("Country: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.actors);
            console.log("\n-------------------------------------------------\n");

    }else{
        console.log("Error!!!")
    }
});
}

function whatItSays(){
    fs.readFile('random.txt',"utf8",function(error, data){
        let txt = data.split(',');
        spotifyS(txt[1]);
    });
}


