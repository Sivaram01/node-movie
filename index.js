// import is a modren syntax in node to make use of it change the ('type': module) in package.json file 
import  express  from "express"; 
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

const app = express();
const PORT = 9000;

app.use(express.json()); 
//use act as middleware where it always listen to app express.json is inbulid middleware

dotenv.config();  // all the key it will put it process.env
//  console.log(process.env);

// const MONGO_URL = process.env.MONGO_URL; //hide this
const MONGO_URL= process.env.MONGO_URL;

//create connection function
async function createConnection(){
  const client = new MongoClient(MONGO_URL);
   await client.connect();
   console.log("mongodb connect");
   return client;
}

const client = await createConnection();

//Home page
app.get("/", (request , response)=> {
  response.send("Hello World");
});

//get all movies
app.get("/movies/", async(request , response)=> {
  
  // const {language , ratings} = request.query;
  //Request -> query params

  // console.log(request.query);
  // let filterMovies = movies;
  // if(language){
  //     filterMovies = filterMovies.filter((mv)=> mv.language === language);
  //    response.send(filterMovies);
  // }
  //   if(ratings){
  //     filterMovies = filterMovies.filter((mv)=> mv.ratings === parseInt(ratings));
  //     response.send(filterMovies);
  //    }
  //db.movies.find({})
  const filter = request.query;
  if(filter.ratings){
    filter.ratings = parseFloat(filter.ratings);
  }
  const filterMovies = await getMovies(filter)
    response.send(filterMovies);
});

//post new movies
app.post("/movies/", async(request , response)=>{
const data = request.body;
// console.log(data);
//Create movies - db.movies.insertMany(data)
 const result =  await createMovies(data);
response.send(result);
});

//get movies by id
app.get("/movies/:id", async (request , response)=> {
  console.log(request.params);
  const {id} = request.params;
   //db.movies.findOne({id:'101})
   const movie = await getMovieById(id);

  // const movie = movies.find((mv)=> mv.id === id);
  console.log(movie);
  movie
  ? response.send(movie)
  : response.status(404).send({message: "no matching movies"})
});

app.delete("/movies/:id", async (request , response)=> {
  console.log(request.params);
  const {id} = request.params;
   const result = await deleteMovieById(id);

  console.log(result);
  result.deletedCount > 0
  ? response.send(result)
  : response.status(404).send({message: "no matching movies"})
});

app.put("/movies/:id", async (request , response)=> {
  console.log(request.params);
  const {id} = request.params;
  const data = request.body;
   const result = await updateMovieById(id, data);
   const movie = await getMovieById(id);
   response.send(movie);

});

app.listen(PORT, ()=> console.log("App is started in" , PORT));


async function getMovies(filter) {
  return await client.db('movieApp').collection('movies').find(filter).toArray();
}

async function createMovies(data) {
  return await client.db('movieApp').collection('movies').insertMany(data);
}

async function getMovieById(id) {
  return await client.db('movieApp').collection('movies').findOne({ id: id });
}

async function updateMovieById(id, data) {
  return await client.db('movieApp').collection('movies')
  .updateOne({ id: id }, { $set: data });
}

async function deleteMovieById(id) {
  return await client.db('movieApp').collection('movies').deleteOne({ id: id });
}

