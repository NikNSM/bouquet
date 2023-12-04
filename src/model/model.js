import Observable from '../framework/observable.js';
import { UpdateType } from '../utils/const.js';

export default class Model extends Observable {
  #bouquets = [];
  #favoriteBouquets = {};
  #modelApiService = null;
  constructor({modelApiService}) {
    super();
    this.#modelApiService = modelApiService;
  }

  get bouquets () {
    return this.#bouquets;
  }

  get favoriteBouquets () {
    return this.#favoriteBouquets
  }

  async init() {
    try {
      const bouquets = await this.#modelApiService.bouquets;
      const favoriteBouquets = await this.#modelApiService.delayedBouquets;

      this.#bouquets = bouquets;
      this.#favoriteBouquets = favoriteBouquets;

      this._notify(UpdateType.INIT);
    } catch (err) {
      this.#bouquets = [];
      this.#favoriteBouquets = {};
    }
  }
}
