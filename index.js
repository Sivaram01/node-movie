const { response } = require("express");
const express = require("express");
const { request } = require("http");
const app = express();
const PORT = 9000;


const movies =[
  {
    id : "101",
   name: " Avengers",
   poster : "https://wallpapercave.com/uwp/uwp942200.jpeg"  ,
   ratings :  8,
   summary : "Nick Fury is compelled to launch the Avengers Initiative when Loki poses a threat to planet Earth. His squad of superheroes put their minds together to accomplish the task.",
   trailer : "https://www.youtube.com/embed/TcMBFSGVi1c",
   language: "english",
},
  {
    id : "102",
   name: "Avatar",
   poster : "https://wallpapercave.com/wp/2FoBvF7.jpg"  ,
   ratings : 7.8,
   summary : "Jake, who is paraplegic, replaces his twin on the Na'vi inhabited Pandora for a corporate mission. After the natives accept him as one of their own, he must decide where his loyalties lie.",
   trailer : "https://www.youtube.com/embed/5PSNL1qE6VY",
   language: "english",
},
  {
    id : "103",
   name: "Harry Potter",
   poster : "https://wallpapercave.com/wp/wp4180794.jpg"  ,
   ratings : 7.6,
   summary : "Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry",
   trailer  :"https://www.youtube.com/embed/VyHV0BRtdxo",
   language: "Tamil",
},
  {
    id : "104",
   name: "Titanic",
   poster : "https://wallpapercave.com/wp/KCEjohB.jpg"  ,
   ratings : 7.6,
   summary : "Seventeen-year-old Rose hails from an aristocratic family and is set to be married. When she boards the Titanic, she meets Jack Dawson, an artist, and falls in love with him.",
   trailer  :"https://www.youtube.com/embed/kVrqfYjkTdQ",
   language: "english",
      
},
  {
    id : "105",
   name: "Jurassic World ",
   poster : "https://wallpapercave.com/wp/wp3153552.jpg"  ,
   ratings : 7,
   summary : "A theme park showcasing genetically-engineered dinosaurs turns into a nightmare for its tourists when one of the dinosaurs escapes its enclosure. An ex-military animal expert steps up to save the day..",
   trailer : "https://www.youtube.com/embed/vn9mMeWcgoM",
   language: "malayalam",
},
  {
    id : "106",
   name: " Furious 7 ",
   poster : "https://wallpapercave.com/wp/wp1830963.jpg"  ,
   ratings : 7,
   summary : "Dominic and his family are caught in a quagmire when Shaw's brother seeks bloody revenge. They must not only deal with their enemy but also save a crucial programme from falling into the wrong hands.",
   trailer : "https://www.youtube.com/embed/Skpu5HaVkOc",
   language: "english",
},
] 

app.get("/", (request , response)=> {
  response.send("Hello World");
});

app.get("/movies", (request , response)=> {
  const {language , ratings} = request.query;
  console.log(request.query);
  let filterMovies = movies;
  if(language){
      filterMovies = filterMovies.filter((mv)=> mv.language === language);
     response.send(filterMovies);
  }
    if(ratings){
      filterMovies = filterMovies.filter((mv)=> mv.ratings === +(ratings));
      response.send(filterMovies);
     }
    response.send(filterMovies);
});

app.get("/movies/:id", (request , response)=> {
  console.log(request.params);
  const {id} = request.params;
  const movie = movies.find((mv)=> mv.id === id);
  console.log(movie);
  movie
  ? response.send(movie)
  : response.status(404).send({message: "no matching movies"})
});

app.listen(PORT, ()=> console.log("App is started in" , PORT));