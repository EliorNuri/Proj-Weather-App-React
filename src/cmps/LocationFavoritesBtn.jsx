import React from 'react';
import utilService from '../services/utilService';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { addLocationToFavLocations,removeLocationFromFavorites } from '../actions/weatherActions';
import { connect } from 'react-redux';

function LocationFavoritesBtn({location, favLocations,addLocationToFavLocations,removeLocationFromFavorites}) {
    let isFavLocation = location? utilService.isArrayIncludesObjByProperty(favLocations,'name',location.name): false;
    let elIcon = (isFavLocation) ? (<AiFillHeart />) : (<AiOutlineHeart />);

    async function toggleLocationToFavorites(location) {
        isFavLocation? removeLocationFromFavorites(location) : addLocationToFavLocations(location);
    }

    return (
        <React.Fragment>
            <span onClick={() => { toggleLocationToFavorites(location) }} className="fav-btn icon-wrapper">{elIcon}</span>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    const { favLocations } = state.weather;
    return {
        favLocations
    }
}

const mapDispatchToProps = {
    addLocationToFavLocations,
    removeLocationFromFavorites
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationFavoritesBtn);
