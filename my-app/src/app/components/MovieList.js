"use client";
import { useState, useEffect } from "react";

export default function MovieList() {
  const [movies, setMovies] = useState([])
  const [name, setName] = useState("")
  const [duration, setDuration] = useState("")
  const [rating, setRating] = useState("")
  function refreshMovies() {
    fetch("http://127.0.0.1:8080/get").then(resp => resp.json()).then(data => setMovies(data))
  }
  function addMovie() {
    fetch("http://127.0.0.1:8080/add?name=" + name + "&duration=" + duration + "&rating=" + rating).then(resp => resp.text);
  }
  useEffect(() => { refreshMovies() }, [])


  return (
    <div>
      <h1>Movie Name : </h1>
      {
        movies.map((movie, index) => (
          <h2 key={index}> {movie.name} {movie.duration} {movie.rating} </h2>
        ))
      }

      <input placeholder="movie name" id="movie" onChange={e => { setName(e.target.value) }}></input><br />
      <input placeholder="duration" id="duration" onChange={e => { setDuration(e.target.value) }}></input><br />
      <input placeholder="movie rating" id="rating" onChange={e => { setRating(e.target.value) }}></input><br />
      <button onClick={() => {
        addMovie();
        refreshMovies();
      }
      }> Add new movie </button>
    </div >
  );
}
