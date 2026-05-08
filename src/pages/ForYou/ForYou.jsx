import styles from './ForYou.module.scss';
import { useState } from 'react';
import FilteredMovieList from '@/components/FilteredMovieList/FilteredMovieList';
import Loader from '@/components/Loader/Loader';
import MoviePagination from '@/components/MoviePagination/MoviePagination';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import useForYou from '../../hooks/useForYou';

function ForYou() {
  const [page, setPage] = useState(1);
  const { movies, totalPages, loading, error } = useForYou(page);

  return (
    <section className={styles.upcoming}>
      <h2 className={styles.title}>For You</h2>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <>
          <FilteredMovieList movies={movies} />
          <MoviePagination
            page={page}
            totalPages={totalPages}
            onPrev={() => setPage((prev) => prev - 1)}
            onNext={() => setPage((prev) => prev + 1)}
            onJump={(pageNum) => setPage(pageNum)}
          />
        </>
      )}
    </section>
  );
}

export default ForYou;
