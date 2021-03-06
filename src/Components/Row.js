import React, { useState, useEffect } from "react";
import axios from "../axios";
import "../Styles/Row.css";

const posterBaseUrl = "https://image.tmdb.org/t/p/w500/";

function Row({ title, fetchUrl, isLargeRow }) {
  // STATE: This is basically how you write variables in React
  // Think of state as short-term memory
  const [movies, setMovies] = useState([]);

  // A snippet of code which runs based on a specific condition
  useEffect(() => {
    // When this row loads, we want something to run. Make a request to TMDB to pull what we need
    // if [], run once when the row loads, and don't run again. We are dependent on the variable(s) in the second parameter
    async function fetchData() {
      console.log(fetchUrl);
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      //console.log(`${title}:`, movies);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  console.table(movies);
  console.log("This is a large row: ", isLargeRow);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${posterBaseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
