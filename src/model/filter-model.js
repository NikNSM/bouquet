import Observable from '../framework/observable.js';
import { FilterColors, FilterEventType } from '../utils/const.js';

export default class FilterModel extends Observable {
  #filterEveytType = FilterEventType.ALL;
  #filterColors = new Set([FilterColors.ALL]);

  constructor() {
    super();
  }

  get filterEventType () {
    return this.#filterEveytType;
  }

  get filterColors() {
    return this.#filterColors;
  }

  setFilterEventType(updateType, filter) {
    this.#filterEveytType = filter;

    this._notify(updateType);
  }

  setFilterColors(updateType, filter) {
    this.#filterColors = filter;

    this._notify(updateType);
  }
}
