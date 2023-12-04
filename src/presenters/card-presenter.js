import { replace, render, remove } from '../framework/render.js';
import { UpdateType, UserAction } from '../utils/const.js';
import { ImageSlider } from '../utils/image-slider.js';
import { initModals } from '../modals/init-modals.js';
import CardBouquetView from '../view/card-bouquet-view.js';
import PopupBouquetSliderView from '../view/popup-bouquet-slider-view.js';
import PopupBouquetDescriptionView from '../view/popup-bouqute -description-view.js';

import '../vendor.js';
const Mode = {
  CARD: 'card',
  POPUP: 'popup'
};
export default class CardPresenter {
  #cardBouqueteComponent = null;
  #popupBouquetSlider = null;
  #popupBouquetDescription = null;
  #model = null;
  #handleDataChange = null;
  #handleClickOpenPopup = null;
  #isFavorite = null;
  #bouqute = {};
  #cardContainer = null;
  #popupContainer = null;
  #mode = Mode.CARD;

  constructor({ cardContainer, model, onDateChange, onClickOpenPopup }) {
    this.#cardContainer = cardContainer.element;
    this.#handleDataChange = onDateChange;
    this.#model = model;
    this.#handleClickOpenPopup = onClickOpenPopup;
  }

  init(bouqute, favoriteBouquetsId) {
    this.#bouqute = bouqute;
    this.#isFavorite = favoriteBouquetsId.some((item) => item === this.#bouqute.id);

    const prevCardBouqueteComponent = this.#cardBouqueteComponent;

    this.#cardBouqueteComponent = new CardBouquetView({
      favorite: this.#isFavorite,
      bouquet: this.#bouqute,
      onFavoriteClick: this.#handleFavoriteClick,
      onClickOpenPopup: this.#clickOpenPopupHandler,
      initSlider: this.#initSlider
    });

    if (prevCardBouqueteComponent === null) {
      render(this.#cardBouqueteComponent, this.#cardContainer);
      return;
    }

    replace(this.#cardBouqueteComponent, prevCardBouqueteComponent);

    if (this.#mode === Mode.POPUP) {
      this.#renderPopup();
    }
  }

  #renderPopup = async () => {
    this.#popupContainer = document.querySelector('.modal-product');
    const bouquet = await this.#model.getBoaquetPopup(this.#bouqute.id);
    const prevPopupBouquetSlider = this.#popupBouquetSlider;
    const prevPopupBouquetDescription = this.#popupBouquetDescription;

    this.#popupBouquetSlider = new PopupBouquetSliderView({
      bouquet,
      onClickClosePopup: this.#handleClosePopupClick
    });

    this.#popupBouquetDescription = new PopupBouquetDescriptionView ({
      bouquet,
      isFavorite: this.#isFavorite,
      onClickFavorite: this.#handleFavoriteClick}
    );

    if (prevPopupBouquetSlider === null || prevPopupBouquetDescription === null) {
      render(this.#popupBouquetSlider, this.#popupContainer);
      render(this.#popupBouquetDescription, this.#popupContainer);
      return;
    }
    replace(this.#popupBouquetSlider, prevPopupBouquetSlider);
    replace(this.#popupBouquetDescription, prevPopupBouquetDescription);
    this.#initSlider();
  };

  #removePopup = () => {
    remove(this.#popupBouquetSlider);
    remove(this.#popupBouquetDescription);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.CARD;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#removePopup();
    }
  };

  #handleClosePopupClick = () => {
    this.#removePopup();
  };

  #clickOpenPopupHandler = () => {
    this.#handleClickOpenPopup();
    this.#renderPopup();
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.POPUP;
  };

  #handleFavoriteClick = () => {
    if (this.#isFavorite) {
      this.#handleDataChange(
        UserAction.DELETE_FAVORITE,
        UpdateType.PATH,
        this.#bouqute.id,
      );
      return;
    }

    this.#handleDataChange(
      UserAction.ADD_FAVORITE,
      UpdateType.PATH,
      this.#bouqute.id,
    );
  };

  #initSlider = () => {
    const imageSlider = new ImageSlider('.image-slider');
    imageSlider.init();

    // Инициализация попапов
    initModals();
  };

  resetMode = () => {
    this.#removePopup();
  };

  destroy() {
    remove(this.#cardBouqueteComponent);
  }
}
