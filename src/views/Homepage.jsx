import React, { Component } from 'react';
import { connect } from 'react-redux';

import WeatherDetails from '../cmps/WeatherDetails';
import { initLocation } from '../actions/weatherActions';


export class Homepage extends Component {
    render() {
        return (

            <div className="homepage-container">
                <WeatherDetails  isDefultLocation={true} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { defaultCity } = state.weather;
    return {
        defaultCity
    }
}

const mapDispatchToProps = {
    initLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);

