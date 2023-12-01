import FilterColorsView from '../view/filter-colors-view.js';
import FilterTypeView from '../view/filter-type-view';
import FilterTypeContainerView from '../view/filter-type-container-view.js';
import FilterColorsContainerView from '../view/filter-colors-container-view.js';
import { render } from '../framework/render.js';

export default class FilterPresenter {
  #filterTypeContainer = new FilterTypeContainerView ();
  #filterColorsContainer = new FilterColorsContainerView ();
  #mainContainer = null
  #filterTypeView = null;
  #filterColorsView = null;

  constructor({mainContainer}) {
    this.#mainContainer = mainContainer
  }

  init() {
    this.#renderFilter();
  }
  #renderContainer () {
    render(this.#filterTypeContainer, this.#mainContainer)
    render(this.#filterColorsContainer, this.#mainContainer)
  }

  #renderFilter() {
    this.#renderContainer();
    const listColors = this.#filterColorsContainer.element.querySelector('.container')
    const listType = this.#filterTypeContainer.element.querySelector('.container')
    this.#filterTypeView = new FilterTypeView();
    this.#filterColorsView = new FilterColorsView()
    render(this.#filterTypeView, listType)
    render(this.#filterColorsView, listColors)
  }
}
