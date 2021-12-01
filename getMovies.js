import { client } from "./index.js";


export { getMovies, createMovies, getMovieById, deleteMovieById, updateMovieById } 

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
