import  express  from "express"; 
const router = express.Router();
import { getMovies, createMovies, getMovieById, deleteMovieById, updateMovieById} from '../getMovies.js'

//get all movies
router.get("/", async(request , response)=> {
  
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
router.post("/", async(request , response)=>{
const data = request.body;
// console.log(data);
//Create movies - db.movies.insertMany(data)
 const result =  await createMovies(data);
response.send(result);
});

//get movies by id
router.get("/:id", async (request , response)=> {
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

router.delete("/:id", async (request , response)=> {
  console.log(request.params);
  const {id} = request.params;
   const result = await deleteMovieById(id);

  console.log(result);
  result.deletedCount > 0
  ? response.send(result)
  : response.status(404).send({message: "no matching movies"})
});

router.put("/:id", async (request , response)=> {
  console.log(request.params);
  const {id} = request.params;
  const data = request.body;
   const result = await updateMovieById(id, data);
   const movie = await getMovieById(id);
   response.send(movie);

});

export const movieRouter = router