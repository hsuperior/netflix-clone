import React from "react";
import Row from "./Components/Row";
import requests from "./requests";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Hey! Let's build Netflix Clone</h1>
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
    </div>
  );
}

export default App;
