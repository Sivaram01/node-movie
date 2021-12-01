// import is a modren syntax in node to make use of it change the ('type': module) in package.json file 
import  express  from "express"; 
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import { movieRouter } from "./routes/movies.js";

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

export const client = await createConnection();

//Home page
app.get("/", (request , response)=> {
  response.send("Hello World");
});

app.use("/movies", movieRouter)

app.listen(PORT, ()=> console.log("App is started in" , PORT));


