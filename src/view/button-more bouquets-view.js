import AbstractView from '../framework/view/abstract-view.js';

function createButtonMoreBouquetsViewTemplate () {
  return `
  <div class="catalogue__btn-wrap">
    <button class="btn btn--outlined catalogue__show-more-btn" type="button">больше букетов
  </div>
  `;
}

export default class ButtonMoreBouquetsView extends AbstractView {
  #handleClickButtonMoreBouquets = null;
  constructor({onClickButtonMoreBouquets}) {
    super();
    this.#handleClickButtonMoreBouquets = onClickButtonMoreBouquets;

    this.element.addEventListener('click', this.#clickButtonMoreBouquets);
  }

  get template () {
    return createButtonMoreBouquetsViewTemplate ();
  }

  #clickButtonMoreBouquets = (evt) => {
    if(evt.target.tagName !== 'BUTTON'){
      return;
    }

    evt.preventDefault();
    this.#handleClickButtonMoreBouquets();
  };
}
