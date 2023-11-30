import { UpdateType } from '../utils/const.js';

export default class MainPresenter {
  #bouquets = [];
  #delayedBouquetsId = []
  #delayedBouquets = {}
  #model = null;

  constructor({model}) {
    this.#model = model

    this.#model.addObserver(this.#handleModelEvent)
  }

  #getBouquets(data){
    console.log('23')
    this.#bouquets = data.bouquets
    this.#delayedBouquetsId = Object.keys(data.delayedBouquets.products)
    this.#delayedBouquets = data.delayedBouquets;
    console.log(this.#bouquets)
    console.log(this.#delayedBouquetsId)
    console.log(this.#delayedBouquets)
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
