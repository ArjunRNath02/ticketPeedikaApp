/* eslint-disable prettier/prettier */
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = '66908eef67c9f1f6e6901775f9820b01';
const YOUTUBE_BASE_URL = 'https://www.youtube.com/watch';

const ENDPOINTS = {
    NOW_PLAYING : '/movie/now_playing',
    UP_COMING : '/movie/upcoming',
    MOVIE : '/movie',
};

const APPEND_TO_RESPONSE = {
    VIDEOS: 'videos',
};

export {TMDB_BASE_URL,TMDB_API_KEY,ENDPOINTS,APPEND_TO_RESPONSE,YOUTUBE_BASE_URL};
