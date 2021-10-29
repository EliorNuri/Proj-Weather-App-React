import React from 'react';
import WeatherDetails from '../cmps/WeatherDetails';

function LocationWeatherDetails(props) {
    const { city } = props.match.params;
    return (
        <div className="location-weather-details-container">
            <WeatherDetails city={city} />
        </div>
    )
}

export default LocationWeatherDetails;
