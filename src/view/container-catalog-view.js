import AbstractView from '../framework/view/abstract-view.js';

function createContainerCatalogView () {
  return `
  <div class="catalogue" data-items="catalogue">
    <div class="container">
      <div class="catalogue__header">
        <h2 class="title title--h3 catalogue__title">Каталог</h2>

      </div>
    </div>
  </div>
  `;
}

export default class ContainerCatalogView extends AbstractView {
  get template () {
    return createContainerCatalogView();
  }
}
