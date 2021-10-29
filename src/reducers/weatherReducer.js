import {
    ADD_LOCATION_FAV_LIST,
    REMOVE_LOCATION_FAV_LIST,
    INIT_LOCATION_DETAILS,
    INIT_DEFAULT_LOCATION,
    SET_DEFAULT_LOCATION_CITY,
    INIT_LOCATION,
    INIT_LOCATIONS_LIST
} from '../actions/actionsType';

const INITIAL_STATE = {
    defaultCity:'Tel Aviv',
    defaultLocation: {},
    // lastLocation: {},
    currentLocation: {},
    favLocations: [],
    locationsList: [],
    locationMainDetails: {
        temp: '',
        city: '',
        country: '',
        description: ''
    }
}

function weatherReducer(state = INITIAL_STATE, action) {

    switch (action.type) {

        case INIT_LOCATION: {
            let { location } = action;
            return {
                ...state,
                defaultLocation: location
            }
        }

        case INIT_LOCATION_DETAILS: {
            let {location} = action;
            let isLocationExist = !!Object.keys(location).length;
            let city = isLocationExist ? location.name : '';
            let { description } = isLocationExist ? location.weather[0] : '';
            let { country } = isLocationExist ? location.sys : '';
            let { temp } = isLocationExist ? location.main : '';

            return {
                ...state,
                locationMainDetails: {
                    ...state.locationMainDetails,
                    city,
                    description,
                    country,
                    temp
                }
            }
        }

        case INIT_LOCATIONS_LIST: {

            let { locations } = action;
            return {
                ...state,
                locationsList: locations
            }
        }

        case ADD_LOCATION_FAV_LIST: {
            let { location } = action;
            let { favLocations } = state;
            let locationList = [...favLocations, location];
            return {
                ...state,
                favLocations: locationList
            }
        }

        case REMOVE_LOCATION_FAV_LIST: {
            let { location } = action;
            let { favLocations } = state;
            let locationList = favLocations.filter((l) => {
                return l.name !== location.name;
            });
            return {
                ...state,
                favLocations: locationList
            }

        }
        
        case SET_DEFAULT_LOCATION_CITY: {
            let { city } = action;
            return {
                ...state,
                defaultCity: city
            }
        }

        default:
            return state;
    }

}


export default weatherReducer;