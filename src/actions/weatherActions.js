import weatherService from '../services/weatherService';
import {
    INIT_LOCATION,
    INIT_LOCATION_DETAILS,
    INIT_LOCATIONS_LIST,
    ADD_LOCATION_FAV_LIST,
    REMOVE_LOCATION_FAV_LIST,
    SET_DEFAULT_LOCATION_CITY
} from './actionsType';

const FALLBACK_CITY = 'Jerusalem';

// Action Creators

export const initLocation = (city, isDefultLocation = false) => {
    return async (dispatch) => {
        var oCity = city || FALLBACK_CITY;
        const location = await weatherService.getLocationData(oCity);
        const { coord } = location;
        const locationExtendedData = await weatherService.getHourlyForecast({ lon: coord.lon, lat: coord.lat });
        location.hourly = locationExtendedData.hourly;
        location.daily = locationExtendedData.daily;
        return (
            isDefultLocation ?
                dispatch(_initLocation(location)) :
                location
        );
    }
}

export const initLocationsList = (cities) => {
    return async (dispatch) => {
        const citiesData = await weatherService.getMultipleCitiesData(cities);
        return dispatch(_initLocationsList(citiesData));
    }
}

export const addLocationToFavLocations = (location) => {
    return async (dispatch) => {
        return dispatch(_addLocationToFavLocations(location));
    }
}

export const removeLocationFromFavorites = (location) => {
    return async (dispatch) => {
        return dispatch(_removeLocationFromFavorites(location));

    }
}

export const initLocationDetails = (location) => {
    return async (dispatch) => {
        return dispatch(_initLocationDetails(location));
    }
}

export const setDefaultLocationCity = (val) => {
    return async (dispatch) => {
        const location = await weatherService.getLocationData(val);
        return (location ?
            dispatch(_setDefaultLocationCity(val)) :
            false)

    }
}


// Actions

function _initLocation(location) {
    return {
        type: INIT_LOCATION,
        location
    }
}

function _initLocationsList(locations) {
    return {
        type: INIT_LOCATIONS_LIST,
        locations
    }
}

function _initLocationDetails(location) {
    return {
        type: INIT_LOCATION_DETAILS,
        location
    }
}

function _addLocationToFavLocations(location) {
    return {
        type: ADD_LOCATION_FAV_LIST,
        location
    }
}

function _removeLocationFromFavorites(location) {
    return {
        type: REMOVE_LOCATION_FAV_LIST,
        location
    }
}

function _setDefaultLocationCity(city){
    return {
        type: SET_DEFAULT_LOCATION_CITY,
        city
    }
}