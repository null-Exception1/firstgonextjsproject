"use client";
import { useState, useEffect } from "react";

export default function MovieList() {
  const [movies, setMovies] = useState([])
  const [name, setName] = useState("")
  const [duration, setDuration] = useState("")
  const [rating, setRating] = useState("")
  const fields = [
    { id: "movie", placeholder: "movie name", setter: setName },
    { id: "duration", placeholder: "duration", setter: setDuration },
    { id: "rating", placeholder: "movie rating", setter: setRating },
  ];
  function refreshMovies() {
    fetch("http://127.0.0.1:8080/get").then(resp => resp.json()).then(data => setMovies(data))
  }
  function addMovie() {
    fetch("http://127.0.0.1:8080/add?name=" + name + "&duration=" + duration + "&rating=" + rating).then(resp => resp.text);
  }
  useEffect(() => { refreshMovies() }, [])

  return (

    <div className="flex justify-center items-center-safe flex-col">

      {
        movies.map((movie, index) => (
          <h2 className="flex font-mono flex-col border-2 border-blue-600 rounded p-1" key={index}> {movie.name} {movie.duration} {movie.rating} </h2>
        ))
      }
      <div className="flex outline-0 flex-row">
        {
          fields.map((item, index) => (
            <input key={index}
              id={item.id}
              placeholder={item.placeholder}
              className="border-blue-600 font-mono border-2 rounded p-3 m-1 outline-none"
              onChange={e => { item.setter(e.target.value) }}></input>
          ))
        }
      </div>

      <button className="border-5 border-rose-500 text-3xl rounded p-5 font-mono"

        onClick={() => {
          addMovie();
          refreshMovies();
        }
        }> Add new movie </button>
    </div >
  );
}
