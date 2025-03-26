import { useEffect, useState } from "react";
import styles from "./MoviePoster.module.css";

const MoviePoster = ({ id, click }) => {
  const [movieDesc, setMovieDesc] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=pt-BR&append_to_response=credits,videos`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
            },
          }
        );
        const data = await response.json();
        setMovieDesc(data);

        // Buscar o primeiro vídeo do tipo "Trailer"
        const trailer = data.videos?.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          setTrailerKey(null); // Indica que não há trailer disponível
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movieDesc) return null;

  const posterUrl = movieDesc.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieDesc.poster_path}`
    : "https://via.placeholder.com/500x750?text=Sem+Imagem";

  return (
    <div className={styles.modalBackdrop} onClick={click}>
      <div className={styles.movieModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.movieInfo}>
          <img src={posterUrl} alt={`Imagem da capa do filme ${movieDesc.title}`} />
          <button className={styles.btnClose} onClick={click}>
            ╳
          </button>
          <div className={styles.movieType}>
            <div>
              <h1>{movieDesc.title}</h1>
              {trailerKey ? (
                <button className={styles.trailerButton} onClick={() => setIsTrailerOpen(true)}>
                  ▶ Trailer
                </button>
              ) : (
                <p className={styles.noTrailer}>Trailer não disponível</p>
              )}
            </div>
          </div>
        </div>

        <div className={styles.containerMisc}>
          <div className={styles.containerFlex}>
            Avaliação: {movieDesc.vote_average.toFixed(1)} | Duração: {movieDesc.runtime} min | {movieDesc.release_date}
          </div>
          <div className={styles.containerFlex}>
            <p>Elenco: {movieDesc.credits?.cast?.slice(0, 5).map((actor) => actor.name).join(", ") || "Não disponível"}</p>
            <p>Gênero: {movieDesc.genres?.map((genre) => genre.name).join(", ") || "Não informado"}</p>
          </div>
        </div>
        <div className={styles.desc}>
          <p>Sinopse: {movieDesc.overview || "Sinopse não disponível."}</p>
        </div>
      </div>

      {/* POP-UP DO TRAILER */}
      {isTrailerOpen && (
        <div className={styles.trailerBackdrop} onClick={() => setIsTrailerOpen(false)}>
          <div className={styles.trailerModal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.btnClose} onClick={() => setIsTrailerOpen(false)}>╳</button>
            <iframe
              width="100%"
              height="450"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer do Filme"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePoster;
