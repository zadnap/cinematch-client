import { fetchJSON } from './client';

export const getFavourites = (page) =>
  fetchJSON(`/user/favourites?page=${page}`);

export const addToFavourites = (movieId) =>
  fetchJSON(`/user/favourites`, {
    method: 'POST',
    body: JSON.stringify({
      movie_id: movieId,
    }),
  });

export const deleteFromFavourites = (movieId) =>
  fetchJSON(`/user/favourites/${movieId}`, {
    method: 'DELETE',
  });

export const checkFavourite = (movieId) =>
  fetchJSON(`/user/favourites/${movieId}`);

export const onboard = (genres, movies) =>
  fetchJSON(`/user/onboarding`, {
    method: 'POST',
    body: JSON.stringify({
      genres,
      movies,
    }),
  });

export const getMe = (options = {}) => fetchJSON(`/user/me`, options);
