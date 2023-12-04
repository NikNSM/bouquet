import { replace, render, remove } from '../framework/render.js';
import { UpdateType, UserAction } from '../utils/const.js';
import CardBouquetView from '../view/card-bouquet-view.js';

export default class CardPresenter {
  #cardBouqueteComponent = null;
  #handleDataChange = null;
  #isFavorite = null;
  #bouqute = {};
  #cardContainer = null;
  constructor({ cardContainer, onDateChange }) {
    this.#cardContainer = cardContainer.element;
    this.#handleDataChange = onDateChange;
  }

  init(bouqute, favoriteBouquetsId) {
    this.#bouqute = bouqute;
    this.#isFavorite = favoriteBouquetsId.some((item) => item === this.#bouqute.id);

    const prevCardBouqueteComponent = this.#cardBouqueteComponent;

    this.#cardBouqueteComponent = new CardBouquetView({
      favorite: this.#isFavorite,
      bouquet: this.#bouqute,
      onFavoriteClick: this.#handleFavoriteClick
    });

    if (prevCardBouqueteComponent === null) {
      render(this.#cardBouqueteComponent, this.#cardContainer);
      return;
    }

    replace(this.#cardBouqueteComponent, prevCardBouqueteComponent);
  }

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

  destroy() {
    remove(this.#cardBouqueteComponent);
  }
}
