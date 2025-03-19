import { useState } from "react";
import MoviePoster from "../moviePoster/MoviePoster";
import styles from "./MovieCard.module.css";

const MovieCard = (props) => {
  // props: propriedades ou argumentos que são passados para um componente
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  return (
    <>
      <div className={styles.movie} onClick={toggleModal}>
        <div>
          <p>{props.Year}</p>
        </div>

        <div>
          <img src={props.Poster} alt="" />
        </div>

        <div>
          <span>{props.Type}</span>
          <h3>{props.Title}</h3>
        </div>
      </div>
      {isModalOpen && (
        <MoviePoster 
        apiUrl={props.apiUrl} 
        movieID={props.imdbID}
        click={toggleModal} />
      )}
    </>
  );
};

export default MovieCard;
