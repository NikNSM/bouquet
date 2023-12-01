import WrapperView from '../view/wrapper-view.js';
import MissionView from '../view/mission-view.js';
import AdvantagesView from '../view/advantages -view.js';
import HeaderCountView from '../view/header-count-view.js';
import FilterPresenter from './filter-presenter.js';
import { UpdateType } from '../utils/const.js';
import { render, replace } from '../framework/render.js';

export default class MainPresenter {
  #wrapperView = new WrapperView();
  #missionView = new MissionView();
  #advatagesView = new AdvantagesView();
  #filterPresenter = null;
  #headerCountView = null;
  #headerCountContainer = null;
  #mainContainer = null
  #bouquets = [];
  #delayedBouquetsId = []
  #delayedBouquets = {

  }
  #model = null;


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
        console.log(data)
        this.#getBouquets(data)
        break
    }
  }
}
