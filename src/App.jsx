import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/footer/Footer";
import MovieCard from "./components/movieCard/MovieCard";
import Header from "./components/header/Header";
import Carousel from "./components/carousel/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./scss/styles.scss";

const App = () => {
  const switchTheme = () => {
    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    document.documentElement.setAttribute("data-bs-theme", theme);
  };

  switchTheme();
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", switchTheme);

  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
  const apiUrl = "https://api.themoviedb.org/3";

  const fetchMovies = async (endpoint) => {
    try {
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    }
  };

  useEffect(() => {
    fetchMovies(
      "/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc"
    );
  }, []);

  const searchMovies = (title) => {
    fetchMovies(
      `/search/movie?query=${title}&include_adult=false&language=pt-BR&page=1`
    );
  };

  return (
    <div id="app" className="bg-gray-900">
      <Header
        search={search}
        setSearch={setSearch}
        searchMovies={searchMovies}
      />
      {movies?.length > 0 ? (
        <div className="m-0 mt-5 mx-5 p-0 px-5 d-flex flex-wrap justify-content-center gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      ) : (
        <h2 className="empty bg-gray-900">Nenhum filme encontrado...</h2>
      )}
      {/* <Carousel /> */}
      <Footer devName={"@strwmay"} devLink={"https://github.com/strwmay"} />
    </div>
  );
};

export default App;
