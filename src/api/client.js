import { refreshToken, signOutUser } from '@/api/auth.api';

const API_URL = import.meta.env.VITE_API_URL;

let isRefreshing = false;
let refreshPromise = null;

const fetchClient = async (url, options = {}) => {
  const accessToken = localStorage.getItem('access_token');
  const refreshTokenValue = localStorage.getItem('refresh_token');
  const config = {
    ...options,
    headers: {
      ...(options.body &&
        !(options.body instanceof FormData) && {
          'Content-Type': 'application/json',
        }),
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
      ...(options.headers || {}),
    },
  };

  let response = await fetch(`${API_URL}${url}`, config);

  if (
    response.status === 401 &&
    !url.includes('/auth/refresh') &&
    refreshTokenValue
  ) {
    try {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshToken();
      }

      await refreshPromise;
    } catch (err) {
      signOutUser();
      throw err;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }

    const newAccessToken = localStorage.getItem('access_token');

    if (!newAccessToken) {
      signOutUser();
      throw new Error('Session expired');
    }

    response = await fetch(`${API_URL}${url}`, {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${newAccessToken}`,
      },
    });
  }

  return response;
};

export const fetchJSON = async (url, options = {}) => {
  const res = await fetchClient(url, options);
  const json = await res.json().catch(() => null);

  if (!res.ok || json?.success === false) {
    throw {
      message: json?.error?.message || 'Request failed',
      code: json?.error?.code,
      status: res.status,
      data: json,
    };
  }

  return json.data;
};
