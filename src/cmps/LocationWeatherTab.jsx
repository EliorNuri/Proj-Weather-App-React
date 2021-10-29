import React from 'react';
import utilService from '../services/utilService';
import { BsDroplet } from "react-icons/bs";
import { BiWind } from "react-icons/bi";
import { RiTempHotLine } from "react-icons/ri";

import {withRouter} from 'react-router-dom';


function LocationWeatherTab({ oLocation, iClass, history }) {
    let { name } = oLocation ? oLocation : {};
    let { temp, humidity } = oLocation.main ? oLocation.main : {};
    let { country } = oLocation.sys ? oLocation.sys : {};
    let { speed: windSpeed } = oLocation.wind ? oLocation.wind : {};
    let icons = [
        { icon: BsDroplet, txt: `${humidity || 0}%` },
        { icon: BiWind, txt: `${(1 / windSpeed).toFixed(2) || 0}km/h` }
    ]

    function moveToLocaionDetails(city) {
        history.push(`/details/${city}`);
    }

    return (
        <div onClick={() => { moveToLocaionDetails(name) }} className={`location-weather-tab flex column  space-between ${iClass ? iClass : ''}`}>
            <div className="tab-screen"></div>
            <div className="flex row center space-between align-start">
                <div className="weather-temp">{utilService.formatTemp(temp)}</div>
                <div className="weather-icon">{utilService.getWeatherIconLong(oLocation)}</div>
            </div>
            <div >
                <div className="weather-city">{oLocation.name}</div>
                <div className="weather-country">{country}</div>
            </div>
            <div className="flex row center space-between">
                <div className="icon-wrapper">
                    <div className="icon-img">{icons[0].icon()}</div>
                    <div className="icon-txt">{icons[0].txt}</div>
                </div>
                <div className="icon-wrapper">
                    <div className="icon-img">{icons[1].icon()}</div>
                    <div className="icon-txt">{icons[1].txt}</div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(LocationWeatherTab);
