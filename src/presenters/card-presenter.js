import { replace, render, remove } from '../framework/render.js';
import CardBouquetView from '../view/card-bouquet-view.js';

export default class CardPresenter {
  #cardBouqueteComponent = null;
  #isFavorite = null;
  #bouqute = {};
  #cardContainer = null;
  constructor({cardContainer}) {
    this.#cardContainer = cardContainer.element;
  }

  init(bouqute, deferedBouquetsId) {
    this.#bouqute = bouqute;
    this.#isFavorite = deferedBouquetsId.some((item) => item === this.#bouqute.id);

    const prevCardBouqueteComponent = this.#cardBouqueteComponent;

    this.#cardBouqueteComponent = new CardBouquetView ({
      favorite: this.#isFavorite,
      bouquet: this.#bouqute
    });

    if(prevCardBouqueteComponent === null) {
      render(this.#cardBouqueteComponent, this.#cardContainer);
      return;
    }

    replace(this.#cardBouqueteComponent, prevCardBouqueteComponent);
  }

  destroy(){
    remove(this.#cardBouqueteComponent)
  }
}
