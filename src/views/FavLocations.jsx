import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import LocationWeatherTab from '../cmps/LocationWeatherTab';
import weatherService from '../services/weatherService';

export class FavLocations extends Component {

    goToDiscover = () =>{
        let {history} = this.props;
        history.push('/discover');
    }


    render() {
        let { favLocations } = this.props;
        let classStr = favLocations.length === 0 ? 'container-flex' : '';
        const elFavLocationsList = favLocations.length ? favLocations.map((location, idx) => {
            ;
            return <LocationWeatherTab oLocation={location} key={idx} />
        }) : (
            <div className="fav-locations-placeholder">
                <h4 className="sub-title">No favorites Locations</h4>
                <div className="base-btn" onClick={this.goToDiscover}>Discover New places</div>
            </div>
        )

        return (
            <div className={`favLocation-container ${classStr}`}>
                <h4 className="sub-title">Your Favorite Locations</h4>
                {elFavLocationsList}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { favLocations } = state.weather;
    return {
        favLocations
    }
}

export default connect(mapStateToProps)(withRouter(FavLocations));
