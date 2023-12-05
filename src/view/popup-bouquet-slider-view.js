import AbstractView from '../framework/view/abstract-view.js';


function createSliderImagePopupTemplate(images, authorPhoto) {
  return images.map((image, index) => `
      <div class="image-slides-list__item swiper-slide">
        <div class="image-slide">
          <picture>
            <source type="image/webp" srcset="${image}, ${image} 2x"><img src="${image}" srcset="${image} 2x" width="1274" height="1789" alt="">
          </picture>${index === 0 ? `<span class="image-author image-slide__author">Автор  фотографии:  «${authorPhoto}»</span>` : ''}
        </div>
      </div>
    `).join(' ');
}

function createPopupBouquetViewTemplate(bouquet) {
  const { images, authorPhoto } = bouquet;
  return `
  <div class="image-slider swiper modal-product__slider">
    <div class="image-slides-list swiper-wrapper">
      ${createSliderImagePopupTemplate(images, authorPhoto)}
    </div>
    <button class="btn-round btn-round--to-left image-slider__button image-slider__button--prev" type="button">
      <svg width="80" height="85" aria-hidden="true" focusable="false">
        <use xlink:href="#icon-round-button"></use>
      </svg>
    </button>
    <button class="btn-round btn-round--to-right image-slider__button image-slider__button--next" type="button">
      <svg width="80" height="85" aria-hidden="true" focusable="false">
        <use xlink:href="#icon-round-button"></use>
      </svg>
    </button>
  </div>
  `;
}

export default class PopupBouquetView extends AbstractView {
  #bouquet = {};
  #handleClosePopup = null;

  constructor({ bouquet, onClickClosePopup }) {
    super();
    this.#bouquet = bouquet;
    this.#handleClosePopup = onClickClosePopup;

    document.querySelector('.btn-close')
      .addEventListener('click', this.#clickClosePopupHandler);
  }

  get template() {
    return createPopupBouquetViewTemplate(this.#bouquet);
  }

  #clickClosePopupHandler = (evt) => {
    evt.preventDefault();
    this.#handleClosePopup();
  };
}
