import Observable from '../framework/observable.js'
import { UpdateType } from '../utils/const.js';

export default class Model extends Observable {
  #bouquets = {};
  #modelApiService = null
  constructor({modelApiService}) {
    super()
    this.#modelApiService = modelApiService;
  }

  get bouquets () {
    return this.#bouquets
  }

  async init() {
    try {
      const bouquets = await this.#modelApiService.bouquets
      const delayedBouquets = await this.#modelApiService.delayedBouquets

      this.#bouquets = {
        bouquets: [...bouquets],
        delayedBouquets: {...delayedBouquets}
      }

      this._notify(UpdateType.INIT, this.#bouquets);
    } catch (err) {
      console.log('Ошибка')
      this.#bouquets = {}
    }
  }
}
