const { getLocationData, getHourlyForecast, getLocationDataByCoordinates } = require('./weather_service');

exports.handler = async (event, context) => {
    let { type } = event.queryStringParameters;
    let { body: reqData } = event;
    let res;

    switch (type) {
        case 'location_data':
            res = await getLocationData(reqData);
            break;
        case 'hourly_forecast':
            res = await getHourlyForecast(reqData);
            break;
        case 'coords':
            res = await getLocationDataByCoordinates(reqData);
            break;
        default:
            break;
    }
    return {
        statusCode: 200,
        body: JSON.stringify(res)
    }
};
