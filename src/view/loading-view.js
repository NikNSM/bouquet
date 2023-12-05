import AbstractView from '../framework/view/abstract-view.js';

function createLoadingTemplate () {
  return `
  <div class="message catalogue__no-items">
    <p class="text text--align-center message__text">Смотрим что у нас есть для вас</p>
  </div>
  `;
}

export default class LoadingView extends AbstractView {
  get template () {
    return createLoadingTemplate();
  }
}
