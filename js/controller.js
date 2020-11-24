import * as model from './model.js';
import homeView from './views/homeView.js';
import movieView from './views/movieView.js';
import searchView from './views/searchView.js';

const paginationBtn = document.querySelectorAll('.pagination-btn');

const getDataAndRenderData = async function () {
  await model.getDataHomePage();
  homeView._renderHomePageData(model.moviesInfo.data)
}

const changePage = async function (e) {
  e.target.classList.contains('prev') ? model.moviesInfo.page-- : model.moviesInfo.page++;
  await model.getDataHomePage();
  homeView._renderHomePageData(model.moviesInfo.data)
}

paginationBtn.forEach(btn => btn.addEventListener('click', changePage));

const getDataAndRenderIt = async function (id) {
  const data = await model.getMovieData(id);
  movieView._renderData(data);
};

['load', 'hashchange'].forEach(event => window.addEventListener(event, function () {
  const id = window.location.hash.slice(1);
  if (!id) return;
  getDataAndRenderIt(id);
}));

getDataAndRenderData();

document.querySelector('.close-btn').addEventListener('click', movieView._close);

const getQueryAndSetData = async function () {
  const query = document.querySelector('.movie-name').value;
  if (!query) return;
  await model.getSearchResults(query);
  searchView._renderData(model.moviesInfo.data);
}

document.querySelector('.search-btn').addEventListener('click', getQueryAndSetData);

