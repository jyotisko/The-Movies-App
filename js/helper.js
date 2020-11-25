
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
    document.querySelectorAll('.spinner').forEach(spinner => spinner.style.display = 'none')
  }
}

export default new Helper();
