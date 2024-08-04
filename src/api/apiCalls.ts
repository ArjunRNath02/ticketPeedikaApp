/* eslint-disable prettier/prettier */
export const apikey: string = '66908eef67c9f1f6e6901775f9820b01';
export const baseImagePath = (size: string, path: string) => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
export const nowShowing: string = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&region=IN`;
export const upComing: string = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}&region=IN`;
export const popularMovies: string = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&region=IN`;


export const searchMovies = (keyword: string) => {
  return `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${keyword}`;
};
export const movieDetails = (id: number) => {
  return `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`;
};
export const similarMovies = (id: number) => {
  return `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apikey}&sort_by=primary_release_date.desc`;
};
export const movieCastDetails = (id: number) => {
  return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`;
};
export const movieTrailer = (id: number) => {
  return `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apikey}`;
};
export const ytUrl = (_key:string) => {
  return 'https://www.youtube.com/watch';
};
export const actorDetails = (id: number) => {
  return `https://api.themoviedb.org/3/person/${id}?api_key=${apikey}`;
};
export const actorMovies = (id: number) => {
  return `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apikey}&sort_by=primary_release_date.desc`;
};
