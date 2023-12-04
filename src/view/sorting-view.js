import AbstractView from '../framework/view/abstract-view.js';
import { TypeSort } from '../utils/const.js';

const classActiveSorting = 'sorting-price__link--active';
function createSortingViewTemplate () {
  return `
  <div class="catalogue__sorting">
    <div class="sorting-price">
      <h3 class="title sorting-price__title">Цена</h3>
      <a class="sorting-price__link sorting-price__link--incr sorting-price__link--active" href="#" aria-label="сортировка по возрастанию цены" data-type-sort="${TypeSort.DECREASING}">
        <svg class="sorting-price__icon" width="50" height="46" aria-hidden="true" data-type-sort="${TypeSort.INCREASING}">
          <use xlink:href="#icon-increase-sort" data-type-sort="${TypeSort.INCREASING}"></use>
        </svg>
      </a>
      <a class="sorting-price__link" href="#" aria-label="сортировка по убыванию цены" data-type-sort="${TypeSort.DECREASING}">
        <svg class="sorting-price__icon " width="50" height="46" aria-hidden="true" data-type-sort="${TypeSort.DECREASING}">
          <use xlink:href="#icon-descending-sort" data-type-sort="${TypeSort.DECREASING}"></use>
        </svg>
      </a>
    </div>
  </div>
  `;
}

export default class SortingView extends AbstractView {
  #handleChangeSort = null;

  constructor({onChangeSort}) {
    super();
    this.#handleChangeSort = onChangeSort;

    this.element.addEventListener('click', this.#changeSortHandler);
  }

  get template () {
    return createSortingViewTemplate();
  }

  #changeSortHandler = (evt) => {
    evt.preventDefault()
    if(evt.target.tagName !== 'svg' && evt.target.tagName !== 'use' && evt.target.tagName !== 'A') {
      console.log(evt.target.tagName)
      return;
    }

    this.element.querySelector(`.${classActiveSorting}`).classList.remove(classActiveSorting);

    evt.target.closest('a').classList.add(classActiveSorting);

    this.#handleChangeSort(evt.target.dataset.typeSort);
  }
}
