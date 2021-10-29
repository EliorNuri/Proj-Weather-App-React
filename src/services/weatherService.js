import httpService from './httpService';

const BASE_URL = '/api/weather_route?type=';

async function getLocationData(location) {
    return await httpService.post(`${BASE_URL}location_data`, location, true);
}

async function getHourlyForecast(coords) {
    return await httpService.post(`${BASE_URL}hourly_forecast`, coords, true);

}

async function getLocationDataByCoordinates(lat, lon) {
    return await httpService.post(`${BASE_URL}coords`, { lat, lon }, true);

}

async function getMultipleCitiesData(cities) {

    const promises = await cities.map(async (city) => {
        return await getLocationData(city);
    })

    return Promise.all(promises);
}



const exportedObj = {
    getLocationData,
    getHourlyForecast,
    getMultipleCitiesData,
    getLocationDataByCoordinates
}

export default exportedObj;