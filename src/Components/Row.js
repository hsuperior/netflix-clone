import React, { useState, useEffect } from "react";
import axios from "../axios";
import "../Styles/Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const posterBaseUrl = "https://image.tmdb.org/t/p/w500/";

function Row({ title, fetchUrl, isLargeRow }) {
  // STATE: This is basically how you write variables in React
  // Think of state as short-term memory
  const [movies, setMovies] = useState([]);

  // Set trailerUrl Variable
  const [trailerUrl, setTrailerUrl] = useState("");

  // A snippet of code which runs based on a specific condition
  useEffect(() => {
    // When this row loads, we want something to run. Make a request to TMDB to pull what we need
    // if [], run once when the row loads, and don't run again. We are dependent on the variable(s) in the second parameter
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  // Function that runs when user clicks on picture
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      console.log("Movie:", movie);
      movieTrailer(movie?.name || "")
        .then((url) => {
          // https://www.youtube.com/watch?v=8Qn_spdM5Zg
          const urlParams = new URLSearchParams(new URL(url).search);
          // This gets the "v" value, which in this case would be 8Qn_spdM5Zg
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${posterBaseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
