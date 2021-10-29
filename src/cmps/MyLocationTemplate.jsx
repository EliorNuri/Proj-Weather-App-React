import React from 'react';
import { withRouter } from 'react-router-dom';

import CircleWeather from './CircleWeather';
import ExtendedInfoRow from '../cmps/ExtendedInfoRow';
import utilService from '../services/utilService';
import { HiArrowRight } from "react-icons/hi";


function MyLocationTemplate({ oLocation, history }) {
    const settings = [
        { key: 'Temperature', val: 'Celsius' },
        { key: 'Wind Speed', val: 'm/s' },
        { key: 'Source', val: 'OpenWeatherApi.com' },
    ]
    const DEFAULT_EMPLY_OBJ = {};

    function moveToDetails(city){
        history.push(`/details/${city}`);
    }

    let { name: city } = oLocation;
    let { country } = oLocation.sys ? oLocation.sys : DEFAULT_EMPLY_OBJ;
    let { main: type } = oLocation.weather ? oLocation.weather[0] : DEFAULT_EMPLY_OBJ;
    let { temp } = oLocation.main ? oLocation.main : DEFAULT_EMPLY_OBJ;
    let { speed: windSpeed } = oLocation.wind ? oLocation.wind : DEFAULT_EMPLY_OBJ;
    let { humidity, pressure } = oLocation.main ? oLocation.main : DEFAULT_EMPLY_OBJ;

    let elSettings = settings.map((s, idx) => {
        return (<div className={`row-setting row-setting-${idx} flex row center space-between`}>
            <div className="row-setting-key">{s.key}</div>
            <div className="row-setting-val">{s.val}</div>
        </div>)
    })

    return (
        <div className="my-location-template flex column center justify-start">
            <h4 className="current-location-title">{`${city} , ${country}`}</h4>
            <CircleWeather />
            <div className="weather-type">{type}</div>
            <div className="weather-temp">{`${utilService.formatTemp(temp)} C`}</div>
            <ExtendedInfoRow windSpeed={windSpeed} humidity={humidity} pressure={pressure} />
            {elSettings}
            <div className="base-btn flex row center" onClick={() => {moveToDetails(city)}}>
                <span>
                    Learn More
                </span>
                <HiArrowRight />
            </div>
        </div>
    )
}

export default withRouter(MyLocationTemplate);
