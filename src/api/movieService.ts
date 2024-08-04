/* eslint-disable prettier/prettier */

const axios = require('axios').default;
import {TMDB_API_KEY, TMDB_BASE_URL, ENDPOINTS,YOUTUBE_BASE_URL} from './urls';

const TMDB_HTTP_REQUEST = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

const getNowPlaying = () => TMDB_HTTP_REQUEST.get(ENDPOINTS.NOW_PLAYING);

const getUpComing = () => TMDB_HTTP_REQUEST.get(ENDPOINTS.UP_COMING);

const getMovieById = (movieId: any, append_to_response = '') =>
  TMDB_HTTP_REQUEST.get(
    `${ENDPOINTS.MOVIE}/${movieId}`,
    append_to_response ? {params: {append_to_response}} : null,
  );

  const getVideo = (key: any) => `${YOUTUBE_BASE_URL}?v=${key}`;

  export {getNowPlaying,getUpComing,getMovieById,getVideo};
