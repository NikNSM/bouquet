import WrapperView from '../view/wrapper-view.js';
import MissionView from '../view/mission-view.js';
import AdvantagesView from '../view/advantages -view.js';
import HeaderCountView from '../view/header-count-view.js';
import FilterPresenter from './filter-presenter.js';
import ListBouquetsView from '../view/list-bouquets-view.js';
import ContainerCatalogView from '../view/container-catalog-view.js';
import ButtonMoreBouquetsView from '../view/button-more bouquets-view.js';
import CardPresenter from './card-presenter.js';
import SortingView from '../view/sorting-view.js';
import { TypeSort, UpdateType } from '../utils/const.js';
import { render, replace, remove } from '../framework/render.js';
import { BOUQUETS_COUNT } from './main-presenter.js';

export default class MainPresenter {
  #wrapperView = new WrapperView();
  #missionView = new MissionView();
  #advatagesView = new AdvantagesView();
  #containerCatalog = new ContainerCatalogView();
  #listBouquets = new ListBouquetsView();
  #sortComponent = null;
  #buttonMoreBouquets = null;
  #model = null;
  #filterPresenter = null;
  #headerCountView = null;
  #headerCountContainer = null;
  #mainContainer = null;
  #cardsBouquetsPresenters = new Map();
  #favoriteBouquetsId = [];
  #renderBouquetsCount = BOUQUETS_COUNT;
  #currentSort = TypeSort.INCREASING;


  constructor({ model, mainContainer, headerCountContainer }) {
    this.#model = model;
    this.#mainContainer = mainContainer;
    this.#headerCountContainer = headerCountContainer;
    this.#filterPresenter = new FilterPresenter({ mainContainer: this.#mainContainer });

    this.#model.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderHeaderCount();
    render(this.#wrapperView, this.#mainContainer);
    render(this.#missionView, this.#mainContainer);
    render(this.#advatagesView, this.#mainContainer);
    this.#filterPresenter.init();
    this.#renderCatalogBouquets();
  }

  get bouquets() {
    const bouquets = [...this.#model.bouquets];
    switch (this.#currentSort) {
      case TypeSort.INCREASING:
        bouquets.sort((a, b) => a.price - b.price);
        break;
      case TypeSort.DECREASING:
        ((a, b) => b.price - a.price);
        break;
    }

    return bouquets;
  }

  get favoriteBouquets() {
    const favoriteBouquets = this.#model.favoriteBouquets;
    if (Object.keys(data.delayedBouquets).length !== 0) {
      this.#favoriteBouquetsId = Object.keys(favoriteBouquets.products);
    }
    return favoriteBouquets;
  }

  #renderHeaderCount() {
    const prevHeaderCountView = this.#headerCountView;
    const favoriteBouquets = this.favoriteBouquets;
    this.#headerCountView = new HeaderCountView({ delayedBouquets: favoriteBouquets });
    if (prevHeaderCountView === null) {
      render(this.#headerCountView, this.#headerCountContainer);
      return;
    }

    replace(this.#headerCountView, prevHeaderCountView);
  }

  #renderContainerCatalog() {
    render(this.#containerCatalog, this.#mainContainer);
  }

  #renderCatalogBouquets() {
    const bouquetsCount = this.bouquets.length;
    const bouquets = this.bouquets.slice(0, Math.min(bouquetsCount, this.#renderBouquetsCount));

    this.#renderContainerCatalog();
    const container = this.#containerCatalog.element.querySelector('.container');
    const sortContainer = container.querySelector('.catalogue__header');


    render(this.#listBouquets, container);
    bouquets.forEach(this.#renderCardBouquet);

    if (this.#renderBouquetsCount < bouquetsCount) {
      this.#renderButtonMoreBouquets();
    }
  }


  #renderCardBouquet = (bouquet) => {
    const bouquetPresenter = new CardPresenter({
      cardContainer: this.#listBouquets
    });
    this.#cardsBouquetsPresenters.set(bouquet.id, bouquetPresenter);
    bouquetPresenter.init(bouquet, this.#favoriteBouquetsId);
  };

  #renderButtonMoreBouquets() {
    this.#buttonMoreBouquets = new ButtonMoreBouquetsView({
      onClickButtonMoreBouquets: this.#handleClickButtonMoreBouquets
    });

    render(this.#buttonMoreBouquets, this.#mainContainer);
  }

  #renderSortComponent(sortContainer) {
    this.#sortComponent = new SortingView({
      onChangeSort:
        });

    render(this.#sortComponent, sortContainer);
  }

  #clearListBouquets() {
    this.#cardsBouquetsPresenters.forEach((presenter) => presenter.destroy());
    this.#cardsBouquetsPresenters.clear();

    remove(this.#listBouquets);
    remove(this.#buttonMoreBouquets);

    this.#renderBouquetsCount = BOUQUETS_COUNT;
  }

  #handleClickButtonMoreBouquets = () => {
    const bouquetsCount = this.#bouquets.length;
    const newBouquetsCount = Math.min(bouquetsCount, this.#renderBouquetsCount + BOUQUETS_COUNT);
    const bouquets = this.#bouquets.slice(this.#renderBouquetsCount, newBouquetsCount);

    bouquets.forEach(this.#renderCardBouquet);

    this.#renderBouquetsCount = newBouquetsCount;

    if (this.#renderBouquetsCount >= bouquetsCount) {
      remove(this.#buttonMoreBouquets);
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.INIT:
        remove(this.#listBouquets);
        remove(this.#containerCatalog);
        this.#renderHeaderCount();
        this.#renderCatalogBouquets();
        break;
    }
  };
}
