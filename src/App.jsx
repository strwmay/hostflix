import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/footer/Footer";
import MovieCard from "./components/movieCard/MovieCard";
import Header from "./components/header/Header";

const App = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  const apiKey = "e4d577fa";
  const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}`;

  useEffect(() => {
    searchMovies("spider-man");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  return (
    <div id="app">
      <Header search={search} setSearch={setSearch} searchMovies={searchMovies} />
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, index) => (
            <MovieCard key={index} apiUrl={apiUrl} {...movie} />
          ))}
        </div>
      ) : (
        <h2 className="empty">Nada foi encontrado...</h2>
      )}
      <Footer devName={"@strwmay"} devLink={"https://github.com/strwmay"} />
    </div>
  );
};

export default App;
