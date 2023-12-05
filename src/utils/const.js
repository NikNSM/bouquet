const UpdateType = {
  INIT: 'INIT',
  PATH: 'path',
  MAJOR: 'major',
  MINOR: 'minor'
};

const UserAction = {
  ADD_FAVORITE: 'add favorite',
  DELETE_FAVORITE: 'delete favorite'
};

const TypeBouquet = {
  birthdayboy: 'имениннику',
  forlove: 'любимой',
  bridge: 'невесте',
  colleagues: 'коллеги',
  motherday: 'маме'
};

const TypeSort = {
  INCREASING: 'возрастание',
  DECREASING: 'убывание'
};

const FilterType = {
  TYPE: 'type',
  COLORS: 'colors'
};

const FilterEventType = {
  ALL: 'all',
  BIRTHDAYBOY: 'birthdayboy',
  BRIDGE: 'bridge',
  MOTHERDAY: 'motherday',
  COLLEAGUES: 'colleagues',
  FORLOVE: 'forlove',
};


const FilterColors = {
  ALL: 'all',
  RED: 'red',
  WHITE: 'white',
  LILAC: 'lilac',
  YELLOW: 'yellow',
  PINK: 'pink'
};

const TypeOperation = {
  DELETE_ONE: 'delete one',
  ADD_ONE: 'add one',
  CLEAR_BOUQUETE: 'clear bouquete',
  CLEAR_FAVORITE: 'clear favorite'
};

export { UpdateType, UserAction, TypeBouquet, TypeSort, FilterColors, FilterEventType, FilterType, TypeOperation};
