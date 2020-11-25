import { STARTING_PAGE } from './config.js';
import { COMMON_API_URL } from './config.js';

export const moviesInfo = {
  page: STARTING_PAGE,
  data: [],
  totalPages: undefined
};

export const getDataHomePage = async function () {
  try {

    if (moviesInfo.page === 0) moviesInfo.page = 1;
    if (moviesInfo.totalPages <= moviesInfo.page) moviesInfo.page = +moviesInfo.totalPages - 1;

    const response = await fetch(`${COMMON_API_URL}movie/top_rated?api_key=ae5a24906bcfb97174e76a13e2d54bcb&page=${moviesInfo.page}`);
    const data = await response.json();

    const movies = data.results;
    moviesInfo.data = [];

    movies.forEach(movie => {
      const data = {
        id: movie.id,
        posterPath: movie.poster_path,
        tagLine: movie.overview,
        name: movie.title,
        language: movie.original_language,
        releaseDate: movie.release_date,
        rating: movie.vote_average,
      };

      moviesInfo.data.push(data);
    });
    moviesInfo.totalPages = data.total_pages;

  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const getMovieData = async function (id) {

  try {
    const response = await fetch(`${COMMON_API_URL}movie/${id}?api_key=ae5a24906bcfb97174e76a13e2d54bcb`);
    const data = await response.json();

    const productionCompanies = [];
    data.production_companies.forEach(company => productionCompanies.push(company.name));

    return {
      language: data.original_language,
      title: data.original_title,
      tagLine: data.overview,
      posterPath: data.poster_path,
      productionCompanies: productionCompanies,
      runtime: data.runtime,
      status: data.status,
      imdb: data.imdb_id,
      homepage: data.homepage,
      releaseDate: data.release_date
    }

  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}

export const getSearchResults = async function (query) {

  try {
    if (moviesInfo.page === 0) moviesInfo.page = 1;
    if (moviesInfo.totalPages <= moviesInfo.page) moviesInfo.page = +moviesInfo.totalPages;

    const response = await fetch(`${COMMON_API_URL}search/movie?api_key=ae5a24906bcfb97174e76a13e2d54bcb&query=${query}&page=${moviesInfo.page}`);
    const data = await response.json();

    moviesInfo.data = [];
    const movies = data.results;

    movies.forEach(movie => {
      const data = {
        id: movie.id,
        posterPath: movie.poster_path,
        tagLine: movie.overview,
        name: movie.title,
        language: movie.original_language,
        releaseDate: movie.release_date,
        rating: movie.vote_average,
      };

      moviesInfo.data.push(data);
    });
    moviesInfo.totalPages = data.total_pages;
  }
  catch (err) {
    console.log(err);
    throw new Error(err);
  }
}
