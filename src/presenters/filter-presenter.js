import FilterColorsView from '../view/filter-colors-view.js';
import FilterTypeView from '../view/filter-type-view';
import FilterTypeContainerView from '../view/filter-type-container-view.js';
import FilterColorsContainerView from '../view/filter-colors-container-view.js';
import { render, replace } from '../framework/render.js';
import { FilterColors, UpdateType } from '../utils/const.js';

export default class FilterPresenter {
  #filterTypeContainer = new FilterTypeContainerView ();
  #filterColorsContainer = new FilterColorsContainerView ();
  #filterModel = null;
  #mainContainer = null;
  #filterTypeView = null;
  #filterColorsView = null;

  constructor({mainContainer, filterModel}) {
    this.#mainContainer = mainContainer;
    this.#filterModel = filterModel

    this.#filterModel.addObserver(this.#handleEventModel)
  }

  init() {
    this.#renderFilterEventType()
    this.#renderFilterColors()
  }

  #handleEventModel = () => {
    this.init();
  }

  #renderFilterEventType () {
    const filter = this.#filterModel.filterEventType;

    render(this.#filterTypeContainer, this.#mainContainer);
    const listType = this.#filterTypeContainer.element.querySelector('.container');
    const prevFilterTypeView = this.#filterTypeView
    this.#filterTypeView = new FilterTypeView({
      filter,
      onChangeFilter: this.#handleChangeFilterEventType
    });

    if(prevFilterTypeView === null) {
      render(this.#filterTypeView, listType);
      return;
    }

    replace(this.#filterTypeView, prevFilterTypeView)
  }

  #renderFilterColors () {
    const filters = [...this.#filterModel.filterColors];
    render(this.#filterColorsContainer, this.#mainContainer);
    const listColors = this.#filterColorsContainer.element.querySelector('.container');
    const prevFilterColorsView = this.#filterColorsView
    this.#filterColorsView = new FilterColorsView({
      filters,
      onChangeFilter: this.#hanleChangeFiltersColors
    });

    if(prevFilterColorsView=== null) {
      render(this.#filterColorsView, listColors);
      return;
    }

    replace(this.#filterColorsView, prevFilterColorsView)
  }

  #handleChangeFilterEventType = (filterValue) => {
    if(this.#filterModel.filterEventType === filterValue) {
      return;
    }

    this.#filterModel.setFilterEventType(UpdateType.MAJOR, filterValue)
  }

  #hanleChangeFiltersColors = (filterValue) => {
    const filter = this.#filterModel.filterColors;
    if(filterValue === FilterColors.ALL) {
      if(filter.has(filterValue)){
        return;
      }

      filter.clear();
      filter.add(filterValue)

      this.#filterModel.setFilterColors(UpdateType.MAJOR, filter)
      return;
    }

    if(filter.has(FilterColors.ALL)){
      filter.clear();
      filter.add(filterValue)

      this.#filterModel.setFilterColors(UpdateType.MAJOR, filter)
      return;
    }

    if(this.#filterModel.filterColors.has(filterValue)){
      filter.delete(filterValue)
      this.#filterModel.setFilterColors(UpdateType.MAJOR, filter)
      return;
    }

    filter.add(filterValue)
    this.#filterModel.setFilterColors(UpdateType.MAJOR, filter)
  }
}
