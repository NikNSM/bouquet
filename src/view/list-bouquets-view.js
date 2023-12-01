import AbstractView from '../framework/view/abstract-view.js';

function createListBouquetsView () {
  return `
  <ul class="catalogue__list">
  </ul>
  `;
}
export default class ListBouquetsView extends AbstractView {
  get template () {
    return createListBouquetsView();
  }
}
