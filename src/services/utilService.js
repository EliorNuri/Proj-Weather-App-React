import { TiWeatherCloudy, TiWeatherPartlySunny, TiWeatherNight, TiWeatherSnow, TiWeatherWindy, TiWeatherWindyCloudy, TiWeatherSunny, TiWeatherStormy } from "react-icons/ti";
import { TYPE_PECENTAGE, TYPE_TEMP,NA_PLACEHOLDER, MOBILE_CELLING_VIEWPORT } from './constantsService';


function formatHours(hour, isShortFormat = false) {
    let hourStr = +hour > 12 ? "PM" : "AM";
    let formattedHour = (hour > 12) ? hour - 12 : hour;
    formattedHour = (formattedHour >= 10) ? `${formattedHour}` : `0${formattedHour}`;
    formattedHour += (!isShortFormat) ? ':00' : ' ';
    return [formattedHour, hourStr];
}

//For Data Obj Without nested objects (hourly / daily)
function getWeatherIconShort(data) {
    let icon;
    icon = (data.clouds < 23) ? (<TiWeatherSunny />) :
        (data.wind_speed <= 3) ? (<TiWeatherPartlySunny />) :
            (data.wind_speed <= 5) ? (<TiWeatherCloudy />) :
                (data.wind_speed <= 7) ? (<TiWeatherWindyCloudy />) : (<TiWeatherStormy />);


    return icon;
}

//For Data Obj With nested objects
function getWeatherIconLong(data) {
    let icon;
    icon = (data.clouds.all < 23) ? (<TiWeatherSunny />) :
        (data.wind.speed <= 3) ? (<TiWeatherPartlySunny />) :
            (data.wind.speed <= 5) ? (<TiWeatherCloudy />) :
                (data.wind.speed <= 7) ? (<TiWeatherWindyCloudy />) : (<TiWeatherStormy />);


    return icon;
}

function formatTemp(temp) {
    return temp ? temp.toFixed(0) + ' °' : '0 °';
}

function formatPercentage(value) {
    return value ? value + '%' : NA_PLACEHOLDER;
}


function formatByType(val,type) {
    switch (type) {
        case TYPE_PECENTAGE:
            return formatPercentage(val);
        case TYPE_TEMP :
            return formatTemp(val);
        default:
            return val;
    }
}

function shuffleArr(arr){
    for(let i = 0 ; i < arr.length ; i++){
        let rndIdx = getRandomInt(0,arr.length);
        let temp = arr[i];
        arr[i] = arr[rndIdx];
        arr[rndIdx] = temp;
    }
    return arr;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function isArrayIncludesObjByProperty(arr,prop,val){
    return (arr.filter((item) => {
        return item[prop] === val
    }).length)
}

const exportedObj = {
    formatHours,
    getWeatherIconShort,
    formatTemp,
    formatByType,
    getRandomInt,
    getRandomIntInclusive,
    shuffleArr,
    getWeatherIconLong,
    isArrayIncludesObjByProperty,

}

export default exportedObj;