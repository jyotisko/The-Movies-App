
class Helper {

  parentElement = '';

  loadSpinner(parentElement) {
    this.parentElement = parentElement;
    const markup = `
    <div class="spinner">
      <svg>
        <use href="./../icons.svg#icon-loader"></use>
      </svg>
    </div>
    `;
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  closeSpinner() {
    document.querySelectorAll('.spinner').forEach(spinner => spinner.style.display = 'none');
  }

  clearMoviesContainer() {
    document.querySelector('.section-2__container').innerHTML = '';
  }
}

export default new Helper();
