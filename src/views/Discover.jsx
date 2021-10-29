import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchCmp from '../cmps/SearchCmp';
import utilService from '../services/utilService';
import { initLocationsList } from '../actions/weatherActions';
import LocationWeatherTab from '../cmps/LocationWeatherTab';
import weatherService from '../services/weatherService';
import Spinner from '../cmps/Spinner';

import { FiRefreshCcw } from "react-icons/fi";

export class Discover extends Component {

    state = {
        citiesList: ['New York', 'Bangkok', 'Tokyo', 'Jakarta', 'Jerusalem', 'London', 'Austin', 'Manila', 'Bogota', 'Moscow','Rome','Barcelona'],
        citiesToShowCount: 4,
        searchedCityData: {},
        isShowSpinner: false,
        isShowNotFoundMsg: false
    }

    componentDidMount() {
        this.updateLocationList();
    }

    updateLocationList = () =>{
        let { citiesList, citiesToShowCount } = this.state;
        let { initLocationsList } = this.props;
        citiesList = utilService.shuffleArr(citiesList).slice(0, citiesToShowCount);
        initLocationsList(citiesList);
    }

    setSearchedCity = async (val) => {
        let cityData = await weatherService.getLocationData(val);

        if (cityData) {
            this.setState({
                isShowSpinner: true,
                isShowNotFoundMsg: false
            }, () => {
                setTimeout(() => {
                    this.setState({
                        searchedCityData: cityData,
                        isShowSpinner: false
                    })
                }, utilService.getRandomInt(3000, 6000))
            })
        } else {
            this.setState({
                isShowNotFoundMsg: true
            })
        }
    }

    render() {
        let { searchedCityData, isShowSpinner, isShowNotFoundMsg } = this.state;
        let { locationsList } = this.props;
        let elLocationsList = locationsList.map((location) => {
            return <LocationWeatherTab oLocation={location} />
        })

        let elSearchedCity = (Object.keys(searchedCityData).length !== 0) ?
            (
                <LocationWeatherTab oLocation={searchedCityData} iClass={'my-location-search'} />
            ) :
            (<div></div>); //Empty Div

        elSearchedCity = (isShowSpinner) ? <Spinner /> :
            (isShowNotFoundMsg) ? (<h4 className="sub-title alert">Cant Find Location</h4>) :
                elSearchedCity;

        return (
            <div className="discover-container flex column">
                <SearchCmp handleSearch={this.setSearchedCity} />
                <h4 className="sub-title flex row center space-between">
                    <span>Discover New Places</span>
                    <div className="base-btn flex row center" onClick={this.updateLocationList}>
                        <span>
                            Switch
                        </span>
                        <FiRefreshCcw />
                    </div>
                </h4>
                <div className="location-list-container flex row center space-between wrap">
                    {elLocationsList}
                    {/* <div className="arrow-container">
                        <FiChevronLeft />
                        <FiChevronRight />
                    </div> */}
                </div>
                <div className="line-sperator"></div>
                {elSearchedCity}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { locationsList } = state.weather;
    return {
        locationsList
    }
}

const mapDispatchToProps = {
    initLocationsList
}

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
