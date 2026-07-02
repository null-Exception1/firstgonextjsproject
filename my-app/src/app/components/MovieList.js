"use client";
import { useState, useEffect } from "react";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [rating, setRating] = useState("");


  const fields = [
    { id: "movie", placeholder: "Movie name", setter: setName },
    { id: "duration", placeholder: "Duration", setter: setDuration },
    { id: "rating", placeholder: "Movie rating", setter: setRating },
  ];

  function refreshMovies() {
    fetch("http://127.0.0.1:8080/get")
      .then((resp) => resp.json())
      .then((data) => setMovies(data));
  }

  function addMovie() {
    fetch(
      "http://127.0.0.1:8080/add?name=" +
      name +
      "&duration=" +
      duration +
      "&rating=" +
      rating
    ).then((resp) => resp.text);
  }

  useEffect(() => {
    refreshMovies();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col p-0.5 ">
      {movies.map((movie, index) => (
        <ul className="list bg-base-100 rounded-box shadow-md mt-10 " key={index}>
          <li className="list-row">
            <div>
              <div>Movie</div>
              <div className="text-xs uppercase font-semibold opacity-60">Duration - {movie.duration}, Rating - {movie.rating}</div>
            </div>
            <button className="btn btn-square btn-ghost">
              <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
            </button>
            <button className="btn btn-square btn-ghost">
              <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
            </button>
          </li>

        </ul>

      ))}

      <div className="flex flex-row mt-4">
        {fields.map((item, index) => (
          <input
            key={index}
            id={item.id}
            placeholder={item.placeholder}
            className="input-info input input-bordered bg-white text-black font-mono m-2"
            onChange={(e) => item.setter(e.target.value)}
          />
        ))}
      </div>

      <button
        className="btn btn-info font-mono mt-10 "
        onClick={() => {
          addMovie();
          refreshMovies();
        }}>
        Add new movie
      </button>
    </div>
  );
}
