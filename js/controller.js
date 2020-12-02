import * as model from './model.js';
import homeView from './views/homeView.js';
import movieView from './views/movieView.js';
import searchView from './views/searchView.js';
import helper from './helper.js';
import btnView from './views/btnView.js';

const parentElementSection2 = document.querySelector('#section2');

const manageBtns = function () {
  btnView.showAllBtn();
  if (model.moviesInfo.page === 1) btnView.hidePrevBtn();
  if (model.moviesInfo.totalPages === model.moviesInfo.page) btnView.hideNextBtn();
}

const getDataAndRenderData = async function () {
  try {
    helper.loadSpinner(parentElementSection2);
    await model.getDataHomePage();
    homeView._renderHomePageData(model.moviesInfo.data);
    manageBtns();
    changePageForHomePageData();
    helper.closeSpinner();
  } catch (err) {
    console.log(err);
    alert(`Something went wrong:\n${err}`);
  }
}

const changeHomePage = async function (e) {
  try {
    helper.loadSpinner(parentElementSection2);
    e.target.classList.contains('prev') ? model.moviesInfo.page-- : model.moviesInfo.page++;
    await model.getDataHomePage();
    homeView._renderHomePageData(model.moviesInfo.data);
    console.log(model.moviesInfo);

    manageBtns();

    helper.closeSpinner();
  } catch (err) {
    console.log(err);
    alert(`Something went wrong:\n${err}`);
  }
}

const changePageForHomePageData = function () {
  const paginationBtn = document.querySelectorAll('.pagination-btn');
  paginationBtn.forEach(btn => btn.addEventListener('click', changeHomePage));
}

const getDataAndRenderIt = async function (id) {
  try {
    const data = await model.getMovieData(id);
    movieView._renderData(data);
  } catch (err) {
    console.log(err);
    alert(`Something went wrong:\n${err}`);
  }
};

['load', 'hashchange'].forEach(event => window.addEventListener(event, function () {
  const id = window.location.hash.slice(1);
  if (!id) return;
  getDataAndRenderIt(id);
}));

getDataAndRenderData();

document.querySelector('.close-btn').addEventListener('click', movieView._close);

const changePageForQueryData = async function (query) {
  try {
    const paginationBtn = document.querySelectorAll('.pagination-btn');
    paginationBtn.forEach(btn => btn.addEventListener('click', async function (e) {
      e.target.classList.contains('prev') ? model.moviesInfo.page-- : model.moviesInfo.page++;
      helper.loadSpinner(parentElementSection2);
      await model.getSearchResults(query);
      homeView._renderHomePageData(model.moviesInfo.data);
      helper.closeSpinner();
      manageBtns();
    }));
  } catch (err) {
    console.log(err);
    alert(`Something went wrong:\n${err}`);
  }
}

const getQueryAndSetData = async function () {

  try {

    model.moviesInfo.data = [];
    model.moviesInfo.totalPages = undefined;
    model.moviesInfo.page = 1;

    const query = document.querySelector('.movie-name').value;
    if (!query) return;
    helper.clearMoviesContainer();
    helper.loadSpinner(parentElementSection2);
    await model.getSearchResults(query);
    searchView._renderData(model.moviesInfo.data);
    document.querySelectorAll('.pagination-btn').forEach(btn => btn.removeEventListener('click', changeHomePage));
    helper.closeSpinner();
    console.log(model.moviesInfo);
    manageBtns();
    changePageForQueryData(query);
  }
  catch (err) {
    alert(err);
  }
}

document.querySelector('.search-btn').addEventListener('click', getQueryAndSetData);

