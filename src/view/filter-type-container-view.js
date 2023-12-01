import AbstractView from '../framework/view/abstract-view.js';

function createFilterTypeContainerViewTemplate () {
  return `
  <section class="filter-reason">
    <div class="container">
      <h2 class="title title--h3 filter-reason__title">Выберите повод для букета</h2>
    </div>
  </section>
  `
}

export default class FilterTypeContainerView extends AbstractView {
  get template () {
    return createFilterTypeContainerViewTemplate();
  }
}
