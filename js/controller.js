import * as model from './model.js';
import homeView from './views/homeView.js';
import movieView from './views/movieView.js';
import searchView from './views/searchView.js';

const getDataAndRenderData = async function () {
  await model.getDataHomePage();
  homeView._renderHomePageData(model.moviesInfo.data);
  changePageForHomePageData();
}

const changePage = async function (e) {
  e.target.classList.contains('prev') ? model.moviesInfo.page-- : model.moviesInfo.page++;
  await model.getDataHomePage();
  homeView._renderHomePageData(model.moviesInfo.data);
  console.log('Hello');
}

const changePageForHomePageData = function () {
  const paginationBtn = document.querySelectorAll('.pagination-btn');
  paginationBtn.forEach(btn => btn.addEventListener('click', changePage));
}

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

const changePageForQueryData = async function (query) {
  const paginationBtn = document.querySelectorAll('.pagination-btn');
  paginationBtn.forEach(btn => btn.addEventListener('click', async function (e) {
    e.target.classList.contains('prev') ? model.moviesInfo.page-- : model.moviesInfo.page++;
    await model.getSearchResults(query);
    homeView._renderHomePageData(model.moviesInfo.data)
  }));
}

const getQueryAndSetData = async function () {
  const query = document.querySelector('.movie-name').value;
  if (!query) return;
  await model.getSearchResults(query);
  searchView._renderData(model.moviesInfo.data);
  document.querySelectorAll('.pagination-btn').forEach(btn => btn.removeEventListener('click', changePage))
  changePageForQueryData(query);
}

document.querySelector('.search-btn').addEventListener('click', getQueryAndSetData);

