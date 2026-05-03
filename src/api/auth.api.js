import { fetchJSON } from './client';

export const refreshToken = async () => {
  const data = await fetchJSON('/auth/refresh', {
    method: 'POST',
  });

  localStorage.setItem('access_token', data.access_token);

  return data;
};

export const signUpUser = ({ username, password, passwordConfirmation }) =>
  fetchJSON(`/auth/sign-up`, {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
      password_confirmation: passwordConfirmation,
    }),
  });

export const signInUser = async ({ username, password }) => {
  const data = await fetchJSON(`/auth/sign-in`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);

  return data;
};

export const signOutUser = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};
