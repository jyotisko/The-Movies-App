const btns = document.querySelectorAll('.pagination-btn');
const btnPrev = document.querySelectorAll('.prev');
const btnNext = document.querySelectorAll('.next');

class BtnView {

  showAllBtn() {
    btns.forEach(btn => {
      btn.style.opacity = 100;
      btn.style.pointerEvents = 'all';
    });
  }

  hidePrevBtn() {
    btnPrev.forEach(btn => {
      const element = btn.closest('.pagination-btn');
      element.style.opacity = 0;
      element.style.pointerEvents = 'none';
    });
  }

  hideNextBtn() {
    btnNext.forEach(btn => {
      const element = btn.closest('.pagination-btn');
      element.style.opacity = 0;
      element.style.pointerEvents = 'none';
      console.log('hello');
    });
  }

}

export default new BtnView();
