import ApiService from '../framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE'
};
export default class ModelApiService extends ApiService {
  get bouquets () {
    return this._load({
      url: 'products'
    })
      .then(ApiService.parseResponse);
  }

  get favoriteBouquets () {
    return this._load ({
      url: 'cart'
    })
      .then(ApiService.parseResponse);
  }

  async getBouquet (bouquet) {
    return this._load({
      url: `products/${bouquet}`
    })
      .then(ApiService.parseResponse);
  }

  async addBouquetFavorite (bouquetId) {
    console.log(bouquetId);
    const response = await this._load({
      url: `products/${bouquetId}`,
      method: Method.PUT,
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deleteBouquetsIsFavorite(bouquetId) {
    const response = await this._load({
      url: `products/${bouquetId}`,
      method: Method.DELETE,
    });

    return response;
  }
}
