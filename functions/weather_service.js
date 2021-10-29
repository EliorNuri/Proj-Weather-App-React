const httpService = require('./http_service');

const { REACT_APP_API_KEY } = process.env;
const BASE_API_URL = 'api.openweathermap.org/data/2.5/weather?q=';
const BASE_API_URL_ALT = 'api.openweathermap.org/data/2.5/onecall?';
const BASE_API_URL_ALT_2 = 'api.openweathermap.org/data/2.5/weather?';

const BASE_API_KEY_STR = `&appid=${REACT_APP_API_KEY}`;
const BASE_UNITS_STR = `&units=metric`;

async function getLocationData(location) {
    const url = `${BASE_API_URL}${location}${BASE_UNITS_STR}${BASE_API_KEY_STR}`;
    return await httpService.get(url, location);
}

async function getHourlyForecast(coords) {
    coords = JSON.parse(coords);
    const url = `${BASE_API_URL_ALT}lat=${coords.lat}&lon=${coords.lon}${BASE_UNITS_STR}${BASE_API_KEY_STR}`;
    return await httpService.get(url, coords);

}

async function getLocationDataByCoordinates(coords) {
    coords = JSON.parse(coords);
    const url = `${BASE_API_URL_ALT_2}lat=${coords.lat}&lon=${coords.lon}${BASE_UNITS_STR}${BASE_API_KEY_STR}`;
    return await httpService.get(url, coords);

}


module.exports = {
    getLocationData,
    getHourlyForecast,
    getLocationDataByCoordinates
}

