import Logo from "../../assets/logo-hostflix.png";
import Lupa from "../../assets/search.png";
import "./Header.css";

const Header = ({ search, setSearch, searchMovies }) => {
  const handleKeyPress = (e) => {
    e.key === "Enter" && searchMovies(search);
  };

  return (
    <header className="header">
      <img className="logo" src={Logo} alt="logo" />
      <div className="search">
        <input
          onKeyDown={handleKeyPress}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Busque aqui..."
        />
        <img onClick={() => searchMovies(search)} src={Lupa} alt="Pesquisar" />
      </div>
    </header>
  );
};

export default Header;
