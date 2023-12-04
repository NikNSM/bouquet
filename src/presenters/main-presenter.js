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
import LoadingView from '../view/loading-view.js';
import EmptyView from '../view/empty-view.js';
import { TypeSort, UpdateType, UserAction } from '../utils/const.js';
import { render, replace, remove } from '../framework/render.js';
import { filters } from '../utils/filter.js';

const BOUQUETS_COUNT = 6;
export default class MainPresenter {
  #wrapperView = new WrapperView();
  #missionView = new MissionView();
  #advatagesView = new AdvantagesView();
  #containerCatalog = new ContainerCatalogView();
  #listBouquets = new ListBouquetsView();
  #loadingView = new LoadingView();
  #emptyView = new EmptyView();
  #filterModel = null;
  #sortComponent = null;
  #buttonMoreBouquets = null;
  #model = null;
  #filterPresenter = null;
  #headerCountView = null;
  #headerCountContainer = null;
  #mainContainer = null;
  #listBouquetsContainer = null;
  #sortContainer = null;
  #cardsBouquetsPresenters = new Map();
  #favoriteBouquetsId = [];
  #isLoading = true;
  #renderBouquetsCount = BOUQUETS_COUNT;
  #currentSortType = TypeSort.INCREASING;


  constructor({ model, filterModel, mainContainer, headerCountContainer }) {
    this.#model = model;
    this.#filterModel = filterModel;
    this.#mainContainer = mainContainer;
    this.#headerCountContainer = headerCountContainer;
    this.#filterPresenter = new FilterPresenter({
      mainContainer: this.#mainContainer,
      filterModel: this.#filterModel
    });

    this.#model.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderHeaderCount();
    this.#rendetMainBoard();
  }

  get bouquets() {
    const bouquets = [...this.#model.bouquets];
    const filterEventType = this.#filterModel.filterEventType;
    const filterColors = this.#filterModel.filterColors;
    const filteredBouquets = filters(filterColors, filterEventType, bouquets);

    switch (this.#currentSortType) {
      case TypeSort.INCREASING:
        filteredBouquets.sort((a, b) => a.price - b.price);
        break;
      case TypeSort.DECREASING:
        filteredBouquets.sort((a, b) => b.price - a.price);
        break;
    }

    return filteredBouquets;
  }

  get favoriteBouquets() {
    const favoriteBouquets = this.#model.favoriteBouquets;
    if (Object.keys(favoriteBouquets).length !== 0) {
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

  #rendetMainBoard () {
    if(this.#isLoading) {
      render(this.#loadingView, this.#mainContainer);
      return;
    }

    render(this.#wrapperView, this.#mainContainer);
    render(this.#missionView, this.#mainContainer);
    render(this.#advatagesView, this.#mainContainer);
    this.#filterPresenter.init();
    this.#renderCatalogBouquets();
  }

  #renderCatalogBouquets() {
    render(this.#containerCatalog, this.#mainContainer);
    this.#listBouquetsContainer = this.#containerCatalog.element.querySelector('.container');
    this.#sortContainer = this.#listBouquetsContainer.querySelector('.catalogue__header');
    this.#renderSortComponent();
    this.#renderListBouquets();
  }

  #renderListBouquets() {
    const bouquetsCount = this.bouquets.length;
    const bouquets = this.bouquets.slice(0, Math.min(bouquetsCount, this.#renderBouquetsCount));

    if(bouquetsCount === 0) {
      render(this.#emptyView, this.#listBouquetsContainer);
      return;
    }
    render(this.#listBouquets, this.#listBouquetsContainer);
    bouquets.forEach(this.#renderCardBouquet);

    if (this.#renderBouquetsCount < bouquetsCount) {
      this.#renderButtonMoreBouquets();
    }
  }

  #renderCardBouquet = (bouquet) => {
    const bouquetPresenter = new CardPresenter({
      cardContainer: this.#listBouquets,
      model: this.#model,
      onDateChange: this.#handleActionUser,
      onClickOpenPopup: this.#handleClickOpenPopup,
    });
    this.#cardsBouquetsPresenters.set(bouquet.id, bouquetPresenter);
    bouquetPresenter.init(bouquet, this.#favoriteBouquetsId);
  };

  #renderButtonMoreBouquets() {
    this.#buttonMoreBouquets = new ButtonMoreBouquetsView({
      onClickButtonMoreBouquets: this.#handleClickButtonMoreBouquets
    });

    render(this.#buttonMoreBouquets, this.#listBouquetsContainer);
  }

  #renderSortComponent() {
    this.#sortComponent = new SortingView({
      onChangeSort: this.#handleChangeSort
    });

    render(this.#sortComponent, this.#sortContainer);
  }

  #handleChangeSort = (sortType) => {
    if (sortType === this.#currentSortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearListBouquets();
    this.#renderListBouquets();
  };

  #clearListBouquets({ resetSortType = false } = {}) {
    this.#cardsBouquetsPresenters.forEach((presenter) => presenter.destroy());
    this.#cardsBouquetsPresenters.clear();

    if (resetSortType) {
      this.#currentSortType = TypeSort.INCREASING;
    }

    remove(this.#listBouquets);
    remove(this.#buttonMoreBouquets);

    this.#renderBouquetsCount = BOUQUETS_COUNT;
  }

  #handleClickOpenPopup = () => {
    this.#cardsBouquetsPresenters.forEach((presenter) => presenter.resetMode());
  };

  #handleClickButtonMoreBouquets = () => {
    const bouquetsCount = this.bouquets.length;
    const newBouquetsCount = Math.min(bouquetsCount, this.#renderBouquetsCount + BOUQUETS_COUNT);
    const bouquets = this.bouquets.slice(this.#renderBouquetsCount, newBouquetsCount);

    bouquets.forEach(this.#renderCardBouquet);

    this.#renderBouquetsCount = newBouquetsCount;

    if (this.#renderBouquetsCount >= bouquetsCount) {
      remove(this.#buttonMoreBouquets);
    }
  };

  #handleActionUser = async (actionUser, updateType, bouquetId) => {
    switch (actionUser) {
      case UserAction.ADD_FAVORITE:
        try {
          this.#model.addToFavorite(updateType, bouquetId);
        } catch (err) {
          console.log('ошибка');
        }
        break;
      case UserAction.DELETE_FAVORITE:
        try {
          this.#model.deleteToFavorite(updateType, bouquetId);
        } catch (err) {
          console.log('ошибка');
        }
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingView);
        this.#renderHeaderCount();
        this.#rendetMainBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearListBouquets({ resetSortType: true });
        remove(this.#containerCatalog);
        this.#renderCatalogBouquets();
        break;
      case UpdateType.PATH:
        this.#renderHeaderCount();
        this.#cardsBouquetsPresenters.get(data.id).init(data, this.#favoriteBouquetsId);
        break;
    }
  };
}
