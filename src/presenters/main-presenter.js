import WrapperView from '../view/wrapper-view.js';
import MissionView from '../view/mission-view.js';
import AdvantagesView from '../view/advantages -view.js';
import HeaderCountView from '../view/header-count-view.js';
import FilterPresenter from './filter-presenter.js';
import ListBouquetsView from '../view/list-bouquets-view.js';
import ContainerCatalogView from '../view/container-catalog-view.js';
import ButtonMoreBouquetsView from '../view/button-more bouquets-view.js';
import CardPresenter from './card-presenter.js';
import { UpdateType } from '../utils/const.js';
import { render, replace, remove } from '../framework/render.js';

const BOUQUETS_COUNT = 6;
export default class MainPresenter {
  #wrapperView = new WrapperView();
  #missionView = new MissionView();
  #advatagesView = new AdvantagesView();
  #containerCatalog = new ContainerCatalogView();
  #listBouquets = new ListBouquetsView();
  #buttonMoreBouquets = null;
  #model = null;
  #filterPresenter = null;
  #headerCountView = null;
  #headerCountContainer = null;
  #mainContainer = null;
  #cardsBouquetsPresenters = new Map();
  #bouquets = [];
  #delayedBouquetsId = [];
  #delayedBouquets = {};
  #renderBouquetsCount = BOUQUETS_COUNT;


  constructor({model, mainContainer, headerCountContainer}) {
    this.#model = model;
    this.#mainContainer = mainContainer;
    this.#headerCountContainer = headerCountContainer;
    this.#filterPresenter = new FilterPresenter({mainContainer: this.#mainContainer});

    this.#model.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderHeaderCount();
    render(this.#wrapperView, this.#mainContainer);
    render(this.#missionView, this.#mainContainer);
    render(this.#advatagesView, this.#mainContainer);
    this.#filterPresenter.init();
    this.#renderListBouquets();
  }

  #renderHeaderCount () {
    const prevHeaderCountView = this.#headerCountView;
    this.#headerCountView = new HeaderCountView({delayedBouquets: this.#delayedBouquets});
    if(prevHeaderCountView === null) {
      render(this.#headerCountView, this.#headerCountContainer);
      return;
    }

    replace(this.#headerCountView, prevHeaderCountView);
  }

  #renderContainerCatalog () {
    render(this.#containerCatalog, this.#mainContainer);
  }

  #renderListBouquets () {
    const bouquetsCount = this.#bouquets.length;
    const bouquets = this.#bouquets.slice(0, Math.min(bouquetsCount, this.#renderBouquetsCount));

    this.#renderContainerCatalog();
    const container = this.#containerCatalog.element.querySelector('.container');

    render(this.#listBouquets, container);
    bouquets.forEach(this.#renderCardBouquet);

    if(this.#renderBouquetsCount < bouquetsCount) {
      this.#renderButtonMoreBouquets();
    }
  }

  #renderCardBouquet = (bouquet) => {
    const bouquetPresenter = new CardPresenter ({
      cardContainer: this.#listBouquets
    }) ;
    this.#cardsBouquetsPresenters.set(bouquet.id, bouquetPresenter);
    bouquetPresenter.init(bouquet, this.#delayedBouquetsId);
  };

  #renderButtonMoreBouquets () {
    this.#buttonMoreBouquets = new ButtonMoreBouquetsView ({
      onClickButtonMoreBouquets: this.#handleClickButtonMOreBouquets
    });

    render(this.#buttonMoreBouquets, this.#mainContainer);
  }

  #handleClickButtonMOreBouquets = () => {
    const bouquetsCount = this.#bouquets.length;
    const newBouquetsCount = Math.min(bouquetsCount, this.#renderBouquetsCount + BOUQUETS_COUNT);
    const bouquets = this.#bouquets.slice(this.#renderBouquetsCount, newBouquetsCount);

    bouquets.forEach(this.#renderCardBouquet);

    this.#renderBouquetsCount = newBouquetsCount;

    if (this.#renderBouquetsCount >= bouquetsCount) {
      remove(this.#buttonMoreBouquets);
    }
  };

  #getBouquets(data){
    this.#bouquets = data.bouquets;

    if(Object.keys(data.delayedBouquets).length !== 0) {
      this.#delayedBouquetsId = Object.keys(data.delayedBouquets.products);
      this.#delayedBouquets = data.delayedBouquets;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.INIT:
        this.#getBouquets(data);
        remove(this.#listBouquets);
        remove(this.#containerCatalog);
        this.#renderHeaderCount();
        this.#renderListBouquets();
        break;
    }
  };
}
