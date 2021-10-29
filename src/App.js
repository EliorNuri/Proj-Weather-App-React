import React, { useEffect, useState } from 'react';
import { initLocation } from './actions/weatherActions';

import AppMenu from "./cmps/AppMenu";
import Homepage from "./views/Homepage";
import Discover from "./views/Discover";
import FavLocations from "./views/FavLocations";
import MyLocation from './views/MyLocation';
import LocationWeatherDetails from './views/LocationWeatherDetails';
import Settings from './views/Settings';
import appBackVideo from './styles/assets/vids/app-background-vid.mp4';

import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

function App({ locationMainDetails }) {


  return (
    <div className="App flex row center space-between">
      <AppMenu />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/discover" component={Discover} />
        <Route exact path="/favorites" component={FavLocations} />
        <Route exact path="/mylocation" component={MyLocation} />
        <Route exact path="/details/:city" component={LocationWeatherDetails} />
        <Route exact path="/settings" component={Settings} />

      </Switch>
      <video autoPlay muted loop id="myVideo">
        <source src={appBackVideo} type="video/mp4" />
      </video>

      {/* <div className="main-details-desktop-view flex row center space-between">
        <div>
          <h4>{locationMainDetails.city}</h4>
          <h5>{locationMainDetails.country}</h5>
          <h6>{locationMainDetails.description}</h6>
        </div>
        <div>
          {locationMainDetails.temp}
        </div>
      </div> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { defaultLocation, locationMainDetails } = state.weather;
  return {
    defaultLocation,
    locationMainDetails
  }
}

const mapDispatchToProps = {
  initLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
