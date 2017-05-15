const CitySelector = require('./CitySelector');

/*
http://localhost:3000/regions — список регионов
http://localhost:3000/regions/23 — Краснодарский край
*/

// containerId, regionsURL, localitiesUrl
new CitySelector('citySelector', 'http://localhost:3000/regions', 'http://localhost:3000/localities');

