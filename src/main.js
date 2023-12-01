// Импорт вендоров и утилит, не удаляйте его
import "./vendor";
import { ImageSlider } from "./utils/image-slider";
import { iosVhFix } from "./utils/ios-vh-fix";
import { modals, initModals } from "./modals/init-modals";

import ModelApiService from './model/model-api-service.js';
import Model from './model/model.js';
import MainPresenter from "./presenters/main-presenter.js";

const END_POINT = 'https://grading.objects.pages.academy/flowers-shop'
const AUTHORIZATION = 'Basic djfkldjs230021';

const mainContainer = document.querySelector('main')
const headerCountContainer = document.querySelector('.header__container')
const modelApiService = new ModelApiService (END_POINT, AUTHORIZATION);
const model = new Model ({modelApiService})
const mainPresenter = new MainPresenter({model, mainContainer, headerCountContainer})
model.init();
mainPresenter.init();

// Код для работы попапов, не удаляйте его
window.addEventListener("DOMContentLoaded", () => {
  iosVhFix();

  window.addEventListener("load", () => {
    // Инициализация слайдера
    const imageSlider = new ImageSlider(".image-slider");
    imageSlider.init();

    // Инициализация попапов
    initModals();
  });

  // Пример кода для открытия попапа
  document
    .querySelector(".element-which-is-open-popup")
    .addEventListener("click", () => modals.open("popup-data-attr"));

  // Код отработает, если разметка попапа уже отрисована в index.html

  // Если вы хотите рисовать разметку попапа под каждое "открытие",
  // то не забудьте перенесети в код addEventListener инициализацию слайдера

  // ------------

  // Ваш код...
});

