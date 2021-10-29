import React from 'react';
import CircleWeather from './CircleWeather';
import utilService from '../services/utilService';
import { addLocationToFavLocations,removeLocationFromFavorites } from '../actions/weatherActions';
import { connect } from 'react-redux';

import LocationFavoritesBtn from './LocationFavoritesBtn';
import { COUNTRY_PLACEHOLDER, CITY_PLACEHOLDER } from '../services/constantsService';

function LocationHeaderMainDetailsMobile({ location, favLocations,addLocationToFavLocations,removeLocationFromFavorites }) {
    const { name } = location;
    const { country } = location.sys ? location.sys : {};
    const { main: type } = location.weather ? location.weather[0] : {};
    let { temp } = location.main ? location.main : {};


    return (
        <div className="location-main-details-container">
            <div className="location-details flex column align-start space-evenly">
            <div>{`${name || CITY_PLACEHOLDER} , ${country || COUNTRY_PLACEHOLDER}`}</div>
                <div>{utilService.formatTemp(temp)}</div>
                <div className="flex row center">
                    <div className="weather-type">{type}</div>
                    <LocationFavoritesBtn location={location} />
                </div>
            </div>
            <CircleWeather type={'side-circle'} />

        </div>
    )
}

const mapStateToProps = (state) => {
    const { favLocations } = state.weather;
    return {
        favLocations
    }
}

const mapDispatchToProps = {
    addLocationToFavLocations,
    removeLocationFromFavorites
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationHeaderMainDetailsMobile);
