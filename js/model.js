import { STARTING_PAGE } from './config.js'

export const moviesInfo = {
  page: STARTING_PAGE,
  data: [],
  totalPages: undefined
};

export const getDataHomePage = async function () {
  try {

    if (moviesInfo.page === 0) moviesInfo.page = 1;
    if (moviesInfo.totalPages < moviesInfo.page) moviesInfo.page = moviesInfo.total_pages;

    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=ae5a24906bcfb97174e76a13e2d54bcb&page=${moviesInfo.page}`);
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

      moviesInfo.totalPages = movie.total_pages;
      moviesInfo.data.push(data);
    });
  } catch (err) {
    console.log(err);
  }
};

export const getMovieData = async function (id) {

  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=ae5a24906bcfb97174e76a13e2d54bcb`);
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
  }
}

export const getSearchResults = async function (query) {

  if (moviesInfo.page === 0) moviesInfo.page = 1;
  if (moviesInfo.totalPages < moviesInfo.page) moviesInfo.page = moviesInfo.total_pages;

  const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=ae5a24906bcfb97174e76a13e2d54bcb&query=${query}&page=${moviesInfo.page}`);
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

    moviesInfo.totalPages = movie.total_pages;
    moviesInfo.data.push(data);
  });

}
