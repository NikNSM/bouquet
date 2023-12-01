import AbstractView from '../framework/view/abstract-view.js';

function createFilterColorsContainerViewTemplate () {
  return `
  <section class="filter-color">
    <div class="container">
      <h2 class="title title--h3 filter-color__title">Выберите основной цвет для букета</h2>
    </div>
  </section>
  `
}

export default class FilterColorsContainerView extends AbstractView {
  get template () {
    return createFilterColorsContainerViewTemplate();
  }
}
