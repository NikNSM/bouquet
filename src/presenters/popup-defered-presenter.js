import PopupDeferedView from '../view/popup-defered-view.js';
import { remove, render, replace, RenderPosition } from '../framework/render.js';
import { TypeOperation } from '../utils/const.js';

export default class PopupDeferedPresenter {
  #popupDeferedComponent = null;
  #popupDeferedContainer = null;
  #model = null;

  constructor({ popupDeferdContainer, model}) {
    this.#popupDeferedContainer = popupDeferdContainer;
    this.#model = model;

    this.#model.addObserver(this.#handleModelEvent);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  init() {
    this.#renderPopupDeferedComponent();
  }

  #renderPopupDeferedComponent() {
    const favoriteBouquets = this.#model.favoriteBouquets;
    const bouquets = this.#model.bouquets;
    const prevPopupDeferedComponent = this.#popupDeferedComponent;
    this.#popupDeferedComponent = new PopupDeferedView({
      favoriteBouquets,
      bouquets,
      onClickOperation: this.#handleOperationUser,
      onClickClosePopup: this.#handleClickClosePopup,
    });
    if (prevPopupDeferedComponent === null) {
      document.addEventListener('keydown', this.#escKeyDownHandler);
      render(this.#popupDeferedComponent, this.#popupDeferedContainer, RenderPosition.AFTEREND);
      return;
    }

    replace(this.#popupDeferedComponent, prevPopupDeferedComponent);
  }

  #removePopupDefered () {
    remove(this.#popupDeferedComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#popupDeferedContainer.style.display = '';
  }

  #handleClickClosePopup = () => {
    this.#removePopupDefered();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#removePopupDefered();
    }
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleOperationUser = async (typeOperation, updateType, data) => {
    switch (typeOperation) {
      case TypeOperation.DELETE_ONE:
        try {
          this.#model.deleteToFavorite(updateType, data);
        } catch (err) {
          throw new Error();
        }
        break;
      case TypeOperation.ADD_ONE:
        try {
          this.#model.addToFavorite(updateType, data);
        } catch (err) {
          throw new Error();
        }
        break;
      case TypeOperation.CLEAR_BOUQUETE:
        try {
          this.#model.clearBouquetFavorite(updateType, data);
        } catch (err) {
          throw new Error();
        }
        break;
      case TypeOperation.CLEAR_FAVORITE:
        try {
          this.#model.clearFavorite(updateType);
        } catch (err) {
          throw new Error();
        }
        break;
    }
  };

}
