import WrapperView from '../view/wrapper-view.js';
import MissionView from '../view/mission-view.js';
import AdvantagesView from '../view/advantages -view.js';
import HeaderCountView from '../view/header-count-view.js';
import FilterPresenter from './filter-presenter.js';
import CardBouquetView from '../view/card-bouquet-view.js';
import ListBouquetsView from '../view/list-bouquets-view.js';
import ContainerCatalogView from '../view/container-catalog-view.js';
import CardPresenter from './card-presenter.js';
import { UpdateType } from '../utils/const.js';
import { render, replace, remove } from '../framework/render.js';

export default class MainPresenter {
  #wrapperView = new WrapperView();
  #missionView = new MissionView();
  #advatagesView = new AdvantagesView();
  #containerCatalog = new ContainerCatalogView()
  #listBouquets = new ListBouquetsView()
  #model = null;
  #filterPresenter = null;
  #headerCountView = null;
  #headerCountContainer = null;
  #mainContainer = null
  #cardsBouquetsPresenters = new Map()
  #bouquets = [];
  #delayedBouquetsId = []
  #delayedBouquets = {}


  constructor({model, mainContainer, headerCountContainer}) {
    this.#model = model
    this.#mainContainer = mainContainer
    this.#headerCountContainer = headerCountContainer
    this.#filterPresenter = new FilterPresenter({mainContainer: this.#mainContainer})

    this.#model.addObserver(this.#handleModelEvent)
  }

  init() {
    this.#renderHeaderCount();
    render(this.#wrapperView, this.#mainContainer)
    render(this.#missionView, this.#mainContainer);
    render(this.#advatagesView, this.#mainContainer);
    this.#filterPresenter.init();
    this.#renderListBouquets()
  }

  #renderHeaderCount () {
    const prevHeaderCountView = this.#headerCountView
    this.#headerCountView = new HeaderCountView({delayedBouquets: this.#delayedBouquets})
    if(prevHeaderCountView === null) {
      render(this.#headerCountView, this.#headerCountContainer);
      return;
    }

    replace(this.#headerCountView, prevHeaderCountView)
  }

  #renderContainerCatalog () {
    render(this.#containerCatalog, this.#mainContainer)
  }

  #renderListBouquets () {
    this.#renderContainerCatalog();
    const container = this.#containerCatalog.element.querySelector('.container')
    render(this.#listBouquets, container)
    this.#bouquets.forEach(this.#renderCardBouquet)
  }

  #renderCardBouquet = (bouquet, favoriteBuquets) => {
    const bouquetPresenter = new CardPresenter ({
      cardContainer: this.#listBouquets
    }) ;
    this.#cardsBouquetsPresenters.set(bouquet.id, bouquetPresenter)
    bouquetPresenter.init(bouquet, this.#delayedBouquetsId)
  }

  #getBouquets(data){
    console.log('23')
    console.log(data.bouquets)
    this.#bouquets = data.bouquets

    if(Object.keys(data.delayedBouquets).length !== 0) {
      this.#delayedBouquetsId = Object.keys(data.delayedBouquets.products)
      this.#delayedBouquets = data.delayedBouquets;
      console.log(this.#bouquets)
      console.log(this.#delayedBouquetsId)
      console.log(this.#delayedBouquets)
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.INIT:
        console.log('1')
        this.#getBouquets(data);
        console.log('2')
        remove(this.#listBouquets);
        remove(this.#containerCatalog)
        console.log('3')
        this.#renderHeaderCount()
        console.log('4')
        this.#renderListBouquets();
        break
    }
  }
}
