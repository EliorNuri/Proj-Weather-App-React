import React from 'react';
import utilService from '../services/utilService';

function DailyTemps({dailyList}) {

    const elWeeklyTemps = (dailyList && dailyList.length)? dailyList.slice(1).map((dayData,idx) => {
        let dt = new Date(dayData.dt * 1000).toDateString();
        let [day] = dt.split(' ');
        return (<div className="daily-data-wrapper flex row center justify-start" key={idx}>
            <div>{day}</div>
            <div className="weather-icon">{utilService.getWeatherIconShort(dayData)}</div>
            <div className="temp-container flex row center justify-end">
                <div>{utilService.formatTemp(dayData.temp.day)}</div>
                <div>{utilService.formatTemp(dayData.temp.night)}</div>
            </div>

        </div>)
    }) : null

    return (
        <div className="weekly-weather-data">
            <h4 className="sub-title">Rest Of Week</h4>
            {elWeeklyTemps}
        </div>
    )
}

export default DailyTemps
