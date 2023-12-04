import AbstractView from '../framework/view/abstract-view.js';

function createEmptyViewTemplate () {
  return `
  <div class="message catalogue__no-items">
    <p class="text text--align-center message__text">К сожалению, таких букетов у нас пока нет</p>
  </div>
  `;
}

export default class EmptyView extends AbstractView {
  get template () {
    return createEmptyViewTemplate();
  }
}
