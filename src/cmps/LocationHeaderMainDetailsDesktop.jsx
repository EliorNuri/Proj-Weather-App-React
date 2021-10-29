import React from 'react';
import { CITY_PLACEHOLDER, COUNTRY_PLACEHOLDER } from '../services/constantsService';
import utilService from '../services/utilService';
import LocationFavoritesBtn from './LocationFavoritesBtn';

function LocationHeaderMainDetailsDesktop({location}) {
    const { name } = location;
    const { country } = location.sys ? location.sys : {};
    const { main: type } = location.weather ? location.weather[0] : {};
    let { temp } = location.main ? location.main : {};
    return (
        <div className="location-main-details-alt flex column center">
            <div className="">{`${name || CITY_PLACEHOLDER} , ${country || COUNTRY_PLACEHOLDER}`}</div>
            <div>{`${utilService.formatTemp(temp)} C`}</div>
            <div className="weather-type">{type}</div>
            <LocationFavoritesBtn location={location} />

        </div>
    )
}

export default LocationHeaderMainDetailsDesktop;
