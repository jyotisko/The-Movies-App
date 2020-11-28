import { STARTING_PAGE, COMMON_API_URL, API_KEY } from './config.js';

export const moviesInfo = {
  page: STARTING_PAGE,
  data: [],
  totalPages: undefined
};

export const getDataHomePage = async function () {
  try {

    if (moviesInfo.page === 0) moviesInfo.page = 1;
    if (moviesInfo.totalPages <= moviesInfo.page) moviesInfo.page = +moviesInfo.totalPages - 1;

    const response = await fetch(`${COMMON_API_URL}movie/top_rated?api_key=${API_KEY}&page=${moviesInfo.page}`);
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
    const response = await fetch(`${COMMON_API_URL}movie/${id}?api_key=${API_KEY}`);
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

    const response = await fetch(`${COMMON_API_URL}search/movie?api_key=${API_KEY}&query=${query}&page=${moviesInfo.page}`);
    const data = await response.json();

    moviesInfo.data = [];
    const movies = data.results;

    if (data.results.length === 0) throw new Error('No search results found!');

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
