const container = document.querySelector('.section-2__container');

class HomeView {

  _renderHomePageData(moviesData) {
    container.innerHTML = '';

    moviesData.forEach(movie => {
      let path;
      movie.posterPath == null ? path = `https://www.brdtex.com/wp-content/uploads/2019/09/no-image.png` : path = `https://image.tmdb.org/t/p/w500/${movie.posterPath}`;
      const markup = `
          <a href="#${movie.id}">
            <div class="movie__conatiner" data-id="${movie.id}">
              <div class="movie-image">
                <div class="poster"><img src="${path}" alt="Poster" class="poster-img"></div>
              </div>
              <div class="quick-info">
                <div class="movie-name">${movie.name}</div>
                <div class="tag-line">${movie.tagLine.split(' ').length > 50 ? `${movie.tagLine.split(' ').slice(0, 50).join(' ')} ......` : movie.tagLine}</div>
                <div class="release"> Release:<span class="release-date"> ${movie.releaseDate}</span> | <span
                    class="status">Released</span></div>
                <div class="language">Language: ${movie.language === 'en' ? 'English' : (movie.language).toUpperCase()}</div>
                <div class="ratings">⭐ ${movie.rating} / 10</div>
              </div>
            </div>
          </a>
      `;

      container.insertAdjacentHTML('afterbegin', markup);
    });
  }

}

export default new HomeView();
