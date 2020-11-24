
const parentContainer = document.querySelector('.hidden-section__container')

class MovieView {

  _renderData(data) {
    parentContainer.innerHTML = '';
    let content;
    if (data.homepage === '') content = '';
    if (data.homepage !== '') content = `
        <div class="homepage">
          <a href="${data.homepage}" target="_blank">Visit Official Webpage</a>
        </div>
      `;

    let path;
    data.posterPath == null ? path = `https://www.brdtex.com/wp-content/uploads/2019/09/no-image.png` : path = `https://image.tmdb.org/t/p/w500/${data.posterPath}`;

    const markup = `

      <div class="poster-image-hidden">
        <img src="${path}" alt="Poster">
      </div>

      <div class="brief-movie-info">
        <div class="movie-name">${data.title}</div>
          <div class="tagline-all">
            <span class="red">About:</span> <br>
            ${data.tagLine}
          </div>
        <div class="release-date">
          <span class="red">Release Date: </span>${data.releaseDate}
        </div>
        <div class="status"><span class="red">Status: </span>${data.status}</div>
        <div class="language"><span class="red">Language:</span> ${data.language === 'en' ? 'English' : data.language.toUpperCase()}</div>
        <div class="runtime"><span class="red">Total Runtime: </span>${data.runtime} minutes</div>
        <div class="production-companies">
          <span class="red">Producers:</span>
          <br>
          ${data.productionCompanies.length > 0 ? data.productionCompanies.join('<br>') : 'Data not available'}
        </div>
        ${content}
        <div class="imdb">
          <a href="https://www.imdb.com/title/${data.imdb}/" class="imdb-link" target="_blank">View On IMDb</a>
        </div>
      </div>

  `;

    parentContainer.insertAdjacentHTML('afterbegin', markup);
    document.querySelector('#hidden').style.display = 'grid';
  }

  _close() {
    parentContainer.innerHTML = '';
    document.querySelector('#hidden').style.display = 'none';
    window.location.hash = '';
  }

}

export default new MovieView();