import AbstractView from '../framework/view/abstract-view.js';
import { FilterEventType } from '../utils/const.js';

function createFilterTypeTemplate(filter) {
  return `
  <form class="filter-reason__form" action="#" method="post">
    <div class="filter-reason__form-fields">
      <div class="filter-field-text filter-reason__form-field--for-all filter-reason__form-field">
        <input class="filter-field-text__input filter-reason__form-field--for-all filter-reason__form-field" type="radio" id="filter-reason-field-id-0" name="reason" value="${FilterEventType.ALL}" ${FilterEventType.ALL === filter ? 'checked' : ''}>
        <label class="filter-field-text__label" for="filter-reason-field-id-0"><span class="filter-field-text__text">Для всех</span></label>
      </div>
      <div class="filter-field-text filter-reason__form-field--for-birthday filter-reason__form-field">
        <input class="filter-field-text__input filter-reason__form-field--for-birthday filter-reason__form-field" type="radio" id="filter-reason-field-id-1" name="reason" value="${FilterEventType.BIRTHDAYBOY}" ${FilterEventType.BIRTHDAYBOY === filter ? 'checked' : ''}>
        <label class="filter-field-text__label" for="filter-reason-field-id-1"><span class="filter-field-text__text">Имениннику</span></label>
      </div>
      <div class="filter-field-text filter-reason__form-field--for-bride filter-reason__form-field">
        <input class="filter-field-text__input filter-reason__form-field--for-bride filter-reason__form-field" type="radio" id="filter-reason-field-id-2" name="reason" value="${FilterEventType.BRIDGE}" ${FilterEventType.BRIDGE === filter ? 'checked' : ''}>
        <label class="filter-field-text__label" for="filter-reason-field-id-2"><span class="filter-field-text__text">Невесте</span></label>
      </div>
      <div class="filter-field-text filter-reason__form-field--for-mother filter-reason__form-field">
        <input class="filter-field-text__input filter-reason__form-field--for-mother filter-reason__form-field" type="radio" id="filter-reason-field-id-3" name="reason" value="${FilterEventType.MOTHERDAY}" ${FilterEventType.MOTHERDAY === filter ? 'checked' : ''}>
        <label class="filter-field-text__label" for="filter-reason-field-id-3"><span class="filter-field-text__text">Маме</span></label>
      </div>
      <div class="filter-field-text filter-reason__form-field--for-colleague filter-reason__form-field">
        <input class="filter-field-text__input filter-reason__form-field--for-colleague filter-reason__form-field" type="radio" id="filter-reason-field-id-4" name="reason" value="${FilterEventType.COLLEAGUES}" ${FilterEventType.COLLEAGUES === filter ? 'checked' : ''}>
        <label class="filter-field-text__label" for="filter-reason-field-id-4"><span class="filter-field-text__text">Коллеге</span></label>
      </div>
      <div class="filter-field-text filter-reason__form-field--for-darling filter-reason__form-field">
        <input class="filter-field-text__input filter-reason__form-field--for-darling filter-reason__form-field" type="radio" id="filter-reason-field-id-5" name="reason" value="${FilterEventType.FORLOVE}" ${FilterEventType.FORLOVE === filter ? 'checked' : ''}>
        <label class="filter-field-text__label" for="filter-reason-field-id-5"><span class="filter-field-text__text">Любимой</span></label>
      </div>
    </div>
  <button class="filter-reason__btn visually-hidden" type="submit" tabindex="-1">применить фильтр</button>
  </form>
  `;
}

export default class FilterTypeView extends AbstractView {
  #filter = null;
  #handleChangeFilter = null;

  constructor({filter, onChangeFilter}) {
    super();
    this.#filter = filter;
    this.#handleChangeFilter = onChangeFilter

    this.element.addEventListener('change', this.#changeFilterHandler)
  }

  get template () {
    return createFilterTypeTemplate(this.#filter);
  }

  #changeFilterHandler = (evt) => {
    evt.preventDefault();
    console.log(evt.target.value)
    this.#handleChangeFilter(evt.target.value)
  }
}
