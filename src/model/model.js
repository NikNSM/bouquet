import Observable from '../framework/observable.js';
import { UpdateType } from '../utils/const.js';

export default class Model extends Observable {
  #bouquets = [];
  #favoriteBouquets = {};
  #modelApiService = null;
  constructor({ modelApiService }) {
    super();
    this.#modelApiService = modelApiService;
  }

  get bouquets() {
    return this.#bouquets;
  }

  get favoriteBouquets() {
    return this.#favoriteBouquets;
  }

  async init() {
    try {
      const bouquets = await this.#modelApiService.bouquets;
      const favoriteBouquets = await this.#modelApiService.favoriteBouquets;

      this.#bouquets = bouquets;
      this.#favoriteBouquets = favoriteBouquets;

      this._notify(UpdateType.INIT);
    } catch (err) {
      this.#bouquets = [];
      this.#favoriteBouquets = {};
    }
  }

  async getBoaquetPopup(bouquetId) {
    try {
      const bouquet = await this.#modelApiService.getBouquet(bouquetId);
      return bouquet;
    } catch (err) {
      throw new Error('Can\'t get bouqute');
    }
  }

  async addToFavorite(updateType, bouquetId) {
    try {
      const response = await this.#modelApiService.addBouquetFavorite(bouquetId);
      const favoriteBouquets = await this.#modelApiService.favoriteBouquets;

      this.#favoriteBouquets = favoriteBouquets;

      this._notify(updateType, response);
    } catch (err) {
      throw new Error('Can\'t add favorite');
    }
  }

  async deleteToFavorite(updateType, bouquetId) {
    try {
      await this.#modelApiService.deleteBouquetsIsFavorite(bouquetId);
      const bouquet = this.#bouquets.find((item) => item.id === bouquetId);
      const favoriteBouquets = await this.#modelApiService.favoriteBouquets;
      this.#favoriteBouquets = favoriteBouquets;
      this._notify(updateType, bouquet);
    } catch (err) {
      throw new Error('Can\'t delete favorite');
    }
  }

  async clearBouquetFavorite(updateType, bouquetId) {
    try {
      const arrayBouquetId = Array(this.#favoriteBouquets.products[bouquetId]).fill(bouquetId);
      await this.deleteCyclically(arrayBouquetId);
      const bouquet = this.#bouquets.find((item) => item.id === bouquetId);
      const favoriteBouquets = await this.#modelApiService.favoriteBouquets;
      this.#favoriteBouquets = favoriteBouquets;
      this._notify(updateType, bouquet);
    } catch (err) {
      throw new Error('Can\'t delete favorite');
    }
  }

  async clearFavorite(updateType) {
    try {
      const favoriteId = Object.keys(this.#favoriteBouquets.products);
      const arrayFavoritsId = favoriteId.map((item) => Array(this.#favoriteBouquets.products[item]).fill(item));
      await this.clearCyclically(arrayFavoritsId);
      const favoriteBouquets = await this.#modelApiService.favoriteBouquets;
      this.#favoriteBouquets = favoriteBouquets;
      this._notify(updateType);
    } catch (err) {
      throw new Error('Can\'t delete favorite');
    }
  }

  async deleteCyclically(array) {
    for (const item of array) {
      await this.#modelApiService.deleteBouquetsIsFavorite(item);
    }
  }

  async clearCyclically(array) {
    for (const item of array) {
      await this.deleteCyclically(item);
    }
  }
}
