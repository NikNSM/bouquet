import { FilterColors, FilterType, FilterEventType } from './const.js';

const FilteringByType = {
  [FilterType.TYPE]: (value, bouquets) => value === FilterEventType.ALL ? [...bouquets] : bouquets.filter((bouquet) => bouquet.type === value),
  [FilterType.COLORS]: (values, bouquets) => values.has(FilterColors.ALL) ? [...bouquets] : bouquets.filter((bouquet) => [...values].some((value) => value === bouquet.color))
};

const filters = (filtersColor, filterType, bouquets) => {
  const filterBouquetsType = FilteringByType[FilterType.TYPE](filterType, bouquets);
  const filterBouquetsColors = FilteringByType[FilterType.COLORS](filtersColor, filterBouquetsType);
  return filterBouquetsColors;
};

export { filters };
