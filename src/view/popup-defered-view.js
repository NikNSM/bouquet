import AbstractView from '../framework/view/abstract-view.js';
import { TypeOperation, UpdateType } from '../utils/const.js';

function createPopupDeferedHeaderTemplate () {
  return `
  <section class="hero hero--popup">
  <div class="hero__wrapper">
    <div class="hero__background">
      <picture>
        <source type="image/webp" srcset="img/content/hero-back-popup.webp, img/content/hero-back-popup@2x.webp 2x"><img src="img/content/hero-back-popup.jpg" srcset="img/content/hero-back-popup@2x.jpg 2x" width="1770" height="601" alt="фоновая картинка">
      </picture>
    </div>
    <div class="hero__content">
      <h2 class="title title--h1">Вас<br>заинтересовали</h2>
      <button class="btn-close btn-close--dark hero__popupclose" type="button" aria-label="Закрыть">
        <svg width="56" height="54" aria-hidden="true">
          <use xlink:href="#icon-union"></use>
        </svg>
      </button>
      <div class="btn-close btn-close--dark hero__loader">
        <svg class="hero__loader-icon" width="56" height="56" aria-hidden="true">
          <use xlink:href="#icon-loader"></use>
        </svg>
      </div>
    </div>
  </div>
</section>
  `;
}

function createPopupDeferedItemBouquetTemplate (bouquet, favoriteBouquets) {
  const {title, previewImage, description, price, id} = bouquet;
  return `
  <li class="popup-deferred__item">
    <div class="deferred-card">
      <div class="deferred-card__img">
        <picture>
          <source type="image/webp" srcset="${previewImage}, ${previewImage} 2x"><img src="${previewImage}" srcset="${previewImage} 2x" width="233" height="393" alt="букет">
        </picture>
      </div>
      <div class="deferred-card__content">
        <h2 class="title title--h2">${title}</h2>
        <p class="text text--size-40">${description}</p>
      </div>
      <div class="deferred-card__count">
        <button class="btn-calculate" type="button" data-type-operation="${TypeOperation.DELETE_ONE}" data-value="${id}">
          <svg width="30" height="27" aria-hidden="true" data-type-operation="${TypeOperation.DELETE_ONE}" data-value="${id}">
            <use xlink:href="#icon-minus" data-type-operation="${TypeOperation.DELETE_ONE}" data-value="${id}"></use>
          </svg>
        </button><span>${favoriteBouquets.products[id]}</span>
        <button class="btn-calculate" type="button" data-type-operation="${TypeOperation.ADD_ONE}" data-value="${id}">
          <svg width="30" height="28" aria-hidden="true" data-type-operation="${TypeOperation.ADD_ONE}" data-value="${id}">
            <use xlink:href="#icon-cross" data-type-operation="${TypeOperation.ADD_ONE}" data-value="${id}"></use>
          </svg>
        </button>
      </div>
      <div class="deferred-card__price"><b class="price price--size-middle-p">${price}<span>Р</span></b>
      </div>
      <button class="btn-close deferred-card__close-btn" type="button" data-type-operation="${TypeOperation.CLEAR_BOUQUETE}" data-value="${id}">
        <svg width="55" height="56" aria-hidden="true" data-type-operation="${TypeOperation.CLEAR_BOUQUETE}" data-value="${id}">
          <use xlink:href="#icon-close-big" data-type-operation="${TypeOperation.CLEAR_BOUQUETE}" data-value="${id}"></use>
        </svg>
      </button>
      <svg class="deferred-card__close-btn deferred-card__loader" width="56" height="56" aria-hidden="true">
        <use xlink:href="#icon-loader"></use>
      </svg>
    </div>
  </li>
  `;
}

function creaatePopupDeferedViewTemplate (bouquets, favoriteBouquets) {
  const favoriteBouquetsId = Object.keys(favoriteBouquets.products);
  const bouquetsFavorite = bouquets.filter((bouquet) => favoriteBouquetsId.some((item) => item === bouquet.id));

  return `
  <section class="popup-deferred" style="display:block;">
    <div class="popup-deferred__wrapper">
      ${createPopupDeferedHeaderTemplate()}
      <div class="popup-deferred__container">
        <a class="btn btn--with-icon popup-deferred__btn btn--light" href="#">в&nbsp;каталог
          <svg width="61" height="24" aria-hidden="true">
            <use xlink:href="#icon-arrow"></use>
          </svg>
        </a>
        <ul class="popup-deferred__catalog">
          ${bouquetsFavorite.map((item) => createPopupDeferedItemBouquetTemplate(item, favoriteBouquets)).join(' ')}
        </ul>
      <div class="popup-deferred__btn-container">
        <button class="btn btn--with-icon popup-deferred__btn-clean" type="button" data-type-operation="${TypeOperation.CLEAR_FAVORITE}" >очистить
          <svg width="61" height="24" aria-hidden="true" data-type-operation="${TypeOperation.CLEAR_FAVORITE}" >
            <use xlink:href="#icon-arrow" data-type-operation="${TypeOperation.CLEAR_FAVORITE}"></use>
          </svg>
        </button>
      </div>
      <div class="popup-deferred__sum">
        <p class="text text--total">Итого вы выбрали:</p>
        <div class="popup-deferred__block-wrap">
          <div class="popup-deferred__block">
            <p class="text text--total">Букеты</p><span class="popup-deferred__count" data-atribut="count-defer">${favoriteBouquets.productCount}</span>
          </div>
          <div class="popup-deferred__block">
            <p class="text text--total">Сумма</p><b class="price price--size-middle-p">${favoriteBouquets.sum}<span>Р</span></b>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  `;
}

export default class PopupDeferedView extends AbstractView {
  #favoriteBouquets = null;
  #bouquets = null;
  #handleClickOperation = null;
  #handleClickClosePopup = null;

  constructor({favoriteBouquets, bouquets, onClickOperation, onClickClosePopup}) {
    super();
    this.#favoriteBouquets = favoriteBouquets;
    this.#bouquets = bouquets;
    this.#handleClickOperation = onClickOperation;
    this.#handleClickClosePopup = onClickClosePopup;

    this.element.addEventListener('click', this.#clickOperationHandler);
    this.element.querySelector('.hero__popupclose').addEventListener('click', this.#clickClosePopup);
    this.element.querySelector('.popup-deferred__btn').addEventListener('click', this.#clickClosePopup);
  }

  get template () {
    return creaatePopupDeferedViewTemplate(this.#bouquets, this.#favoriteBouquets);
  }

  #clickOperationHandler = (evt) => {
    if(evt.target.tagName !== 'BUTTON' && evt.target.tagName !== 'svg' && evt.target.tagName !== 'use') {
      return;
    }
    evt.preventDefault();
    if(evt.target.dataset.typeOperation === TypeOperation.CLEAR_FAVORITE) {
      this.#handleClickOperation(
        evt.target.dataset.typeOperation,
        UpdateType.MINOR);
      return;
    }

    this.#handleClickOperation(
      evt.target.dataset.typeOperation,
      UpdateType.PATH,
      evt.target.dataset.value);
  };

  #clickClosePopup = (evt) => {
    evt.preventDefault();
    this.#handleClickClosePopup();
  };
}
