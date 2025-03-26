import { useState } from "react";
import MoviePoster from "../moviePoster/MoviePoster";
import styles from "./MovieCard.module.css";

// const MovieCard = ({ id, title, poster_path, release_date, media_type }) => {
const MovieCard = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const imageUrl = props.poster_path
    ? `https://image.tmdb.org/t/p/w500${props.poster_path}`
    : "https://via.placeholder.com/500x750?text=Sem+Imagem";

  return (
    <>
      <div className={`m-0 ${styles.movie}`} onClick={toggleModal}>
        <div>
          <p>{props.release_date ? props.release_date.split("-")[0] : "Desconhecido"}</p>
        </div>

        <div>
          <img src={imageUrl} alt={props.title} />
        </div>

        <div className="h-25 m-0 px-3 py-2">
          <span className="m-0">{props.media_type || "Filme"}</span>
          <h3 className="fs-4">{props.title}</h3>
        </div>
      </div>

      {isModalOpen && (
        <MoviePoster click={toggleModal} {...props} />
      )}
    </>
  );
};

export default MovieCard;
