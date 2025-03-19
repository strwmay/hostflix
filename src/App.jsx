import { useEffect, useState } from "react";
import './App.css'
import Footer from './components/footer/Footer';
import MovieCard from "./components/movieCard/MovieCard";
import Logo from "./assets/logo-hostflix.png";
import Lupa from "./assets/search.png";

const App = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  // utilizando chave de API do arquivo .env
  // const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const apiKey = "e4d577fa"
  const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}`;

  // alimentando com dados para não ficar nulo | com o useEffect
  useEffect(() => {
    searchMovies("spider-man");
  }, []);

  // criando a conexão com a API e trazendo informações
  const searchMovies = async (title) => {
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json();

    // alimentando o movies
    setMovies(data.Search);
  };

  const handleKeyPress = (e) => {
    // e = evento | ao clicar ou digitar acontece algo
    e.key === "Enter" && searchMovies(search);
  };

  return (
    <div id="app">
      <img className="logo" src={Logo} alt="logo" />

      <div className="search">
        <input
          onKeyDown={handleKeyPress}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Busque aqui..."
        />

        <img
          onClick={() => searchMovies(search)}
          src={Lupa}
          alt="Pesquisar"
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, index) => (
            <MovieCard key={index} apiUrl={apiUrl} {...movie} />
          ))}
        </div>
      ) : (
        <h2>Nada foi encontrado...</h2>
      )}

      <Footer devName={"@strwmay"} devLink={"https://github.com/strwmay"} />
    </div>
  );
};

export default App;