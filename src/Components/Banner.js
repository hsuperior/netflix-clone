import React, { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../requests";
import "../Styles/Banner.css";

const imageBaseUrl = "https://image.tmdb.org/t/p/w500/";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      ); // Get a random movie to populate it in the banner
      return request;
    }
    fetchData();
  }, []);

  console.log("Banner Movie: ", movie);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        // Optional Chain (?) : the "?" is for if the movie is ever undefined,
        // it will handle the error elegantly
        backgroundImage: `url(
        ${imageBaseUrl}${movie?.backdrop_path}
      )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1>
          {/** We do this so this takes care of any edge cases, for example if the API does not give us consistent info */}
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>

        <h1 className="banner__description">{movie?.overview}</h1>
      </div>
    </header>
  );
}

export default Banner;
