import { fetchJSON } from './client';

export const getUpcomingMovies = (page) =>
  fetchJSON(`/movies/upcoming?page=${page}`);

export const getTrendingMovies = (page) =>
  fetchJSON(`/movies/trending?page=${page}`);

export const getPreviewTrailers = (limit) =>
  fetchJSON(`/movies/trailers?limit=${limit}`);

export const getMovieDetail = (id) => fetchJSON(`/movies/detail/${id}`);

export const getAllGenres = () => fetchJSON(`/movies/all-genres`);

export const getMoviesByGenres = (ids = [], page) =>
  fetchJSON(`/movies/by-genres?ids=${ids.join()}&page=${page}`);

export const getFeaturedMovie = () => fetchJSON(`/movies/featured`);

export const searchMovie = (query = '', page) =>
  fetchJSON(`/movies/search?query=${encodeURIComponent(query)}&page=${page}`);

export const getForYou = (page) => fetchJSON(`/movies/recommend?page=${page}`);
