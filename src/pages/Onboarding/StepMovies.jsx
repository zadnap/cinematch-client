import styles from './Onboarding.module.scss';
import useMoviesByGenres from '@/hooks/useMoviesByGenres';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Loader from '@/components/Loader/Loader';

const StepMovies = ({ selectedGenres, selectedMovies, onToggle }) => {
  const {
    movies,
    loading: movieLoading,
    error: movieError,
  } = useMoviesByGenres(selectedGenres, 1);
  return (
    <div className={styles.movieGrid}>
      {movieLoading && <Loader className={styles.gridFallback} />}
      {movieError && (
        <ErrorMessage message={movieError} className={styles.gridFallback} />
      )}
      {!movieLoading &&
        !movieError &&
        movies.map((movie) => (
          <div
            key={movie.id}
            className={`${styles.movieCard} ${
              selectedMovies.some((m) => m.id === movie.id)
                ? styles.selected
                : ''
            }`}
            onClick={() =>
              onToggle({
                id: movie.id,
                title: movie.title,
                year: movie.year,
                genres: movie.genres,
              })
            }
          >
            <img src={movie.posterSrc} alt={movie.title} />
            <span className={styles.srOnly}>{movie.title}</span>
          </div>
        ))}
    </div>
  );
};

export default StepMovies;
