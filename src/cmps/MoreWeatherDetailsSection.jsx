import React from 'react';
import utilService from '../services/utilService';
import {TYPE_PECENTAGE,TYPE_TEMP} from '../services/constantsService';

import { FaTemperatureHigh, FaTemperatureLow ,FaAdn,FaCloud , FaRegSnowflake} from "react-icons/fa";
import { RiTempHotFill,RiRainyFill } from "react-icons/ri";



function MoreWeatherDetailsSection({ location }) {

    const FEELS_LIKE = 'Feels Like';
    const MINIMUM_TEMP = 'Minimum Temp';
    const MAXIMUM_TEMP = 'Maximum Temp';
    const CLOUDS = 'Clouds';
    const RAIN_CHANCE = 'Rain Chance';
    const SNOW_CHANCE = 'Snow Chance';


    function getMoreDetailsIcon(key) {
        switch (key) {
            case FEELS_LIKE:
                return <RiTempHotFill />;
            case MINIMUM_TEMP:
                return <FaTemperatureLow />;
            case MAXIMUM_TEMP:
                return <FaTemperatureHigh />;
            case CLOUDS:
                return <FaCloud />;
            case RAIN_CHANCE:
                return <RiRainyFill />;
            case SNOW_CHANCE:
                return <FaRegSnowflake />;
            default:
                return <FaAdn />;
        }
    }

    function createTabTemplate(key, value,type) {

        return (<React.Fragment>
            <div className="weather-icon-lg">{getMoreDetailsIcon(key)}</div>
            <div>{key}</div>
            <div>{utilService.formatByType(value,type)}</div>
        </React.Fragment>)

    }

    function createMoreDetailsTemplate() {
        return (<div className="more-weather-details-tab flex row center space-between wrap">

            <div>{createTabTemplate(FEELS_LIKE, location.main.feels_like,TYPE_TEMP)}</div>
            <div>{createTabTemplate(MINIMUM_TEMP, location.main.temp_min,TYPE_TEMP)}</div>
            <div>{createTabTemplate(MAXIMUM_TEMP, location.main.temp_max,TYPE_TEMP)}</div>
            <div>{createTabTemplate(CLOUDS, location.clouds.all,TYPE_PECENTAGE)}</div>
            <div>{createTabTemplate(RAIN_CHANCE, location.rain,TYPE_PECENTAGE)}</div>
            <div>{createTabTemplate(SNOW_CHANCE, location.snow,TYPE_PECENTAGE)}</div>

        </div>)
    }

    let elMoreDetails = (location && Object.keys(location).length) ? createMoreDetailsTemplate() : null;



    return (
        <div className="more-weather-details-container">
            <h4 className="sub-title">More Weather Details</h4>
            {elMoreDetails}
        </div>
    )
}

export default MoreWeatherDetailsSection
