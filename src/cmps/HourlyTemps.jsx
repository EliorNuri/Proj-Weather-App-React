import React from 'react';
import utilService from '../services/utilService';

function HourlyTemps({ hoursList }) {
    const HOURS_COUNT = 5;
    let dailyHours = [];
    function isSameDay(d1, d2) {
        return d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();
    }

    if (hoursList && hoursList.length) {
        for (let i = 0; i < hoursList.length; i++) {
            let dt = hoursList[i].dt;
            if (isSameDay(new Date(dt * 1000), new Date())) {
                dailyHours.push(hoursList[i])
            } else break;
        }
    }


    const elHourlyTemplate = (dailyHours.length) ? dailyHours.slice(0, HOURS_COUNT).map((hour, idx) => {

        let [currHour, dateTimeType] = utilService.formatHours(new Date(hour.dt * 1000).getHours(), true);

        return (<div className="hourly-data flex column center" key={idx}>
            <div className="hourly-dt flex row center">{currHour}{dateTimeType}</div>
            <div className="weather-icon flex row center">{utilService.getWeatherIconShort(hour)}</div>
            <div className="hourly-temp flex row center">{utilService.formatTemp(hour.temp)}</div>

        </div>)
    })
        : (<div> Data Doesn't Exist </div>);


    return (
        <div className="today-weather-data">
            <h4 className="sub-title">Today</h4>
            <div className="flex row center space-between">
                {elHourlyTemplate}
            </div>
        </div>
    )
}

export default HourlyTemps
