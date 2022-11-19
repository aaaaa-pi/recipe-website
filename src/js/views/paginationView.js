import icons from '../../img/icons.svg';
import View from './View';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandleClick(handle) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline')
      if (!btn) return
      const goToPage = +btn.dataset.goto //加号是隐式转换的一种，将字符串转换为数字
      handle(goToPage)
    })
  }

  _generateMarkup() {
    const curPage = this._data.page
    // 获得页数：
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage)

    // 场景一： 当前页面是页面一，有其他页面
    if (curPage === 1 && numPages > 1) {
      return `
       <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
             <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
     `
    }
    // 场景二： 最后一页
    if (curPage === numPages && numPages > 1) {
      return `
       <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
     `
    }

    // 场景三： 其他页面
    if (curPage < numPages) {
      return `
       <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
          <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
             <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
     `
    }

    // 场景四： 页面一，没有其他页面
    return ''
  }
}
export default new paginationView();