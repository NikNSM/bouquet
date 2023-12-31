import AbstractView from '../framework/view/abstract-view.js';
import { FilterColors} from '../utils/const.js';

function createFilterColorsViewTemplate (filters) {
  return `
  <form class="filter-color__form" action="#" method="post">
    <div class="filter-color__form-fields" data-filter-color="filter">
      <div class="filter-field-img filter-color__form-field">
        <input class="filter-field-img__input filter-color__form-field" type="checkbox" id="filter-colors-field-id-0" name="colors" value="${FilterColors.ALL}" data-filter-color="${FilterColors.ALL}" ${filters.some((filter) => filter === FilterColors.ALL) ? 'checked' : ''}>
        <label class="filter-field-img__label" for="filter-colors-field-id-0"><span class="filter-field-img__img">
          <picture>
            <source type="image/webp" srcset="img/content/filter-all.webp, img/content/filter-all@2x.webp 2x"><img src="img/content/filter-all.png" srcset="img/content/filter-all@2x.png 2x" width="130" height="130" alt="все цвета">
          </picture></span><span class="filter-field-img__text">все цвета</span>
        </label>
      </div>
      <div class="filter-field-img filter-color__form-field">
        <input class="filter-field-img__input filter-color__form-field" type="checkbox" id="filter-colors-field-id-1" name="colors" value="${FilterColors.RED}" data-filter-color="${FilterColors.RED}" ${filters.some((filter) => filter === FilterColors.RED) ? 'checked' : ''}>
        <label class="filter-field-img__label" for="filter-colors-field-id-1"><span class="filter-field-img__img">
          <picture>
            <source type="image/webp" srcset="img/content/filter-red.webp, img/content/filter-red@2x.webp 2x"><img src="img/content/filter-red.png" srcset="img/content/filter-red@2x.png 2x" width="130" height="130" alt="красный">
          </picture></span><span class="filter-field-img__text">красный</span>
        </label>
      </div>
      <div class="filter-field-img filter-color__form-field">
        <input class="filter-field-img__input filter-color__form-field" type="checkbox" id="filter-colors-field-id-2" name="colors" value="${FilterColors.WHITE}" data-filter-color="${FilterColors.WHITE}" ${filters.some((filter) => filter === FilterColors.WHITE) ? 'checked' : ''}>
        <label class="filter-field-img__label" for="filter-colors-field-id-2"><span class="filter-field-img__img">
          <picture>
            <source type="image/webp" srcset="img/content/filter-white.webp, img/content/filter-white@2x.webp 2x"><img src="img/content/filter-white.png" srcset="img/content/filter-white@2x.png 2x" width="130" height="130" alt="белый">
          </picture></span><span class="filter-field-img__text">белый</span>
        </label>
      </div>
      <div class="filter-field-img filter-color__form-field">
        <input class="filter-field-img__input filter-color__form-field" type="checkbox" id="filter-colors-field-id-3" name="colors" value="${FilterColors.LILAC}" data-filter-color="${FilterColors.LILAC}" ${filters.some((filter) => filter === FilterColors.LILAC) ? 'checked' : ''}>
        <label class="filter-field-img__label" for="filter-colors-field-id-3"><span class="filter-field-img__img">
          <picture>
            <source type="image/webp" srcset="img/content/filter-lilac.webp, img/content/filter-lilac@2x.webp 2x"><img src="img/content/filter-lilac.png" srcset="img/content/filter-lilac@2x.png 2x" width="130" height="130" alt="сиреневый">
          </picture></span><span class="filter-field-img__text">сиреневый</span>
        </label>
      </div>
      <div class="filter-field-img filter-color__form-field">
        <input class="filter-field-img__input filter-color__form-field" type="checkbox" id="filter-colors-field-id-4" name="colors" value="${FilterColors.YELLOW}" data-filter-color="${FilterColors.YELLOW}" ${filters.some((filter) => filter === FilterColors.YELLOW) ? 'checked' : ''}>
        <label class="filter-field-img__label" for="filter-colors-field-id-4"><span class="filter-field-img__img">
          <picture>
            <source type="image/webp" srcset="img/content/filter-yellow.webp, img/content/filter-yellow@2x.webp 2x"><img src="img/content/filter-yellow.png" srcset="img/content/filter-yellow@2x.png 2x" width="130" height="130" alt="жёлтый">
          </picture></span><span class="filter-field-img__text">жёлтый</span>
        </label>
      </div>
      <div class="filter-field-img filter-color__form-field">
        <input class="filter-field-img__input filter-color__form-field" type="checkbox" id="filter-colors-field-id-5" name="colors" value="${FilterColors.PINK}" data-filter-color="${FilterColors.PINK}" ${filters.some((filter) => filter === FilterColors.PINK) ? 'checked' : ''}>
        <label class="filter-field-img__label" for="filter-colors-field-id-5"><span class="filter-field-img__img">
          <picture>
            <source type="image/webp" srcset="img/content/filter-pink.webp, img/content/filter-pink@2x.webp 2x"><img src="img/content/filter-pink.png" srcset="img/content/filter-pink@2x.png 2x" width="130" height="130" alt="розовый">
          </picture></span><span class="filter-field-img__text">розовый</span>
        </label>
      </div>
    </div>
    <button class="visually-hidden" type="submit" tabindex="-1">применить фильтр</button>
  </form>
  `;
}

export default class FilterColorsView extends AbstractView {
  #filters = null;
  #handleChangeFilter = null;
  constructor({filters, onChangeFilter}) {
    super();
    this.#filters = filters;
    this.#handleChangeFilter = onChangeFilter;

    this.element.addEventListener('change', this.#changeFilterHandler);
  }

  get template () {
    return createFilterColorsViewTemplate(this.#filters);
  }

  #changeFilterHandler = (evt) => {
    evt.preventDefault();
    this.#handleChangeFilter(evt.target.value);
  };
}
