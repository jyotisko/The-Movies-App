const container = document.querySelector('.section-2__container');

class HomeView {

  constructor() {
  }

  _renderHomePageData(moviesData) {
    container.innerHTML = '';

    moviesData.forEach(movie => {
      const markup = `
          <a href="#${movie.id}"><div class="movie__conatiner" data-id="${movie.id}">
            <div class="movie-image">
              <div class="poster"><img src="https://image.tmdb.org/t/p/w500/${movie.posterPath}" alt="Poster" class="poster-img"></div>
            </div>
            <div class="quick-info">
              <div class="movie-name">${movie.name}</div>
              <div class="tag-line">${movie.tagLine.split(' ').length > 50 ? `${movie.tagLine.split(' ').slice(0, 50).join(' ')} ......` : movie.tagLine}</div>
              <div class="release"> Release:<span class="release-date"> ${movie.releaseDate}</span> | <span
                  class="status">Released</span></div>
              <div class="language">Language: ${movie.language === 'en' ? 'English' : (movie.language).toUpperCase()}</div>
              <div class="ratings">⭐ ${movie.rating} / 10</div>
            </div>
          </div></a>
      `;

      container.insertAdjacentHTML('afterbegin', markup);
    });
  }

}

export default new HomeView();
