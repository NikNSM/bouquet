import AbstractView from '../framework/view/abstract-view.js';

function createPopupDescriptionViewTemplate (bouquet, isFavorite) {
  const {description, title, price} = bouquet;
  return `
  <div class="product-description">
    <div class="product-description__header">
      <h3 class="title title--h2">${title}</h3><b class="price price--size-big">${price}<span>Р</span></b>
    </div>
    <p class="text text--size-40">${description}</p>
    <button class="btn btn--outlined btn--full-width product-description__button" type="button" data-focus>${isFavorite ? 'Отложено' : 'Отложить'}
    </button>
  </div>
  `;
}

export default class PopupBouquetDescriptionView extends AbstractView {
  #bouquet = {};
  #isFavorite = null;
  #handleClickFavorite = null;

  constructor({bouquet, isFavorite, onClickFavorite}) {
    super();
    this.#bouquet = bouquet;
    this.#isFavorite = isFavorite;
    this.#handleClickFavorite = onClickFavorite;

    this.element.querySelector('.btn--outlined')
      .addEventListener('click', this.#clickFavoriteHandler );
  }

  get template() {
    return createPopupDescriptionViewTemplate(this.#bouquet, this.#isFavorite);
  }

  #clickFavoriteHandler = (evt) => {
    evt.preventDefault();
    this.#handleClickFavorite();
  };
}
