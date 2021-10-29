import React, { Component } from 'react';
import { connect } from 'react-redux';

import { initLocation,initLocationDetails } from '../actions/weatherActions';

import LocationHeaderMainDetailsMobile from './LocationHeaderMainDetailsMobile';
import ExtendedInfoRow from '../cmps/ExtendedInfoRow';
import SunriseSunsetCmp from '../cmps/SunriseSunsetCmp';
import HourlyTemps from '../cmps/HourlyTemps';
import DailyTemps from '../cmps/DailyTemps';
import MoreWeatherDetailsSection from '../cmps/MoreWeatherDetailsSection';
import LocationHeaderMainDetailsDesktop from './LocationHeaderMainDetailsDesktop';

export class WeatherDetails extends Component {

    state = {
        localLocation: {},
        innerWidth: window.innerWidth
    }

    handleResize = () => {
        this.setState({ innerWidth: window.innerWidth });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);

        const { initLocation, city, isDefultLocation,defaultCity } = this.props;
        let isNotSameCity;

        let fetchData = async () => {
            console.log('Fetching default location data ... ');
            console.log(defaultCity);
            let oCity = city || defaultCity;
            let location = await initLocation(oCity, isDefultLocation);
            if (!isDefultLocation) {

                this.setState((prevState) => {
                    return {
                        ...prevState,
                        localLocation: location
                    }
                })
            }
            //Fix It !
            // location = location.location? location.location : location;
            // initLocationDetails(location);
        };

        // isNotSameCity = city ? city.toUpperCase() !== defaultLocation.name.toUpperCase() : false;

        // //Call API only once Under Some Restrictions - persist data
        // if (Object.keys(defaultLocation).length === 0 ||
        //     isNotSameCity
        // ) 
        fetchData();

    }

    render() {
        const { isDefultLocation, defaultLocation } = this.props;
        const { localLocation, innerWidth } = this.state;
        const location = isDefultLocation ? defaultLocation : localLocation;
        const { speed: windSpeed } = location.wind ? location.wind : {};
        const { humidity, pressure } = location.main ? location.main : {};
        const { sunrise: sunriseAsSec, sunset: sunsetAsSec } = location.sys ? location.sys : {};
        const { hourly, daily } = location ? location : {};
        const elHeader = innerWidth < 500 ?

            (<LocationHeaderMainDetailsMobile location={location} />) :
            (
                <React.Fragment>
                    {/* <h2 className="sub-title weather-statistics-header">Weather Statistics</h2> */}
                    <LocationHeaderMainDetailsDesktop location={location} />
                </React.Fragment>
            )
        return (
            <React.Fragment>
                {elHeader}
                <ExtendedInfoRow humidity={humidity} pressure={pressure} windSpeed={windSpeed} />
                <SunriseSunsetCmp sunriseAsSec={sunriseAsSec} sunsetAsSec={sunsetAsSec} />
                <HourlyTemps hoursList={hourly} />
                <DailyTemps dailyList={daily} />
                <MoreWeatherDetailsSection location={defaultLocation} />

            </React.Fragment>)
    }
}

const mapStateToProps = (state, ownProps) => {
    const { defaultLocation, defaultCity} = state.weather;
    const {isDefultLocation} = ownProps;
    return {
        defaultLocation,
        defaultCity,
        isDefultLocation
    }
}

const mapDispatchToProps = {
    initLocation,
    initLocationDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherDetails);
