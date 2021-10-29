import React from 'react'

function CircleWeather({type,isShowAnimation}) {
    
    let classListStr;
    let classList = ["circle-weather"];
    if(type) classList.push(type);
    if(isShowAnimation) classList.push('circle-weather-animation');

    classListStr = classList.join(' ');

    return (
        <div className={classListStr}>
            
        </div>
    )
}

export default CircleWeather;
