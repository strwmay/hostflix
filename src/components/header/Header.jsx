import Logo from "../../assets/logo-hostflix.svg";
import { Search } from "react-bootstrap-icons";
import "./Header.css";

const Header = ({ search, setSearch, searchMovies }) => {
  const handleKeyPress = (e) => {
    e.key === "Enter" && searchMovies(search);
  };

  return (
    <header className="header d-flex flex-column flex-md-row justify-content-between align-items-center p-2">
      <img
        className="logo img-fluid"
        src={Logo}
        alt="logo"
        style={{ maxWidth: "250px" }}
      />
      <div className="search rounded-1 mt-3 input-group w-75 py-1 px-3 align-items-center">
        <input
          onKeyDown={handleKeyPress}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="form-control bg-transparent form-control-sm border-0 fs-5 fw-regular"
          placeholder="Busque aqui..."
        />
        <Search
          onClick={() => searchMovies(search)}
          role="button"
          className="search-icon "
          size={30}
        />
      </div>
    </header>
  );
};

export default Header;
