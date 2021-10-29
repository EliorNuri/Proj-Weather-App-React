import React, { Component } from 'react';
import CircleWeather from '../cmps/CircleWeather';

import { BiCurrentLocation } from "react-icons/bi";
import weatherService from '../services/weatherService';
import MyLocationTemplate from '../cmps/MyLocationTemplate';
import Spinner from '../cmps/Spinner';
import utilService from '../services/utilService';

export class MyLocation extends Component {
    Spinner
    state = {
        myLocation: {},
        isShowSpinner: false
    }

    findMyLocation = async () => {
        if ("geolocation" in navigator) {
            console.log("Available");

            navigator.geolocation.getCurrentPosition(async (position) => {
                let myLocation = await weatherService.getLocationDataByCoordinates(position.coords.latitude, position.coords.longitude);

                this.setState({
                    isShowSpinner: true,
                    isShowNotFoundMsg: false
                }, () => {
                    setTimeout(() => {
                        this.setState((prevState) => {
                            return {
                                ...prevState,
                                myLocation,
                                isShowSpinner: false
                            }
                        })
                    }, utilService.getRandomInt(3000, 6000))
                })

            });
        } else {
            console.log("Not Available");
        }
    }

    createMyLocationTemplate = (location) => {
        let len = Object.keys(location).length;
        return (len) ? this.createLocationTemplate(location) : this.createFindMyLocationTemplate();
    }

    createLocationTemplate = (location) => {
        return (<MyLocationTemplate oLocation={location} />)
    }

    createFindMyLocationTemplate = () => {
        return (
            <div onClick={this.findMyLocation} className="flex row center">
                <CircleWeather isShowAnimation={true} />
            </div>
        )
    }


    render() {
        let { myLocation, isShowSpinner } = this.state;
        let headerText = isShowSpinner ? 'Finding Your Location...' : 'Find Your Location';
        let myLocationClassStr = '';
        let headerClassStr = 'find-location-header';

        if (Object.keys(myLocation).length !== 0) {
            headerText = 'Your Location Now';
            myLocationClassStr = 'justify-start';
            headerClassStr = '';
        }
        let elMyLocationTemplate = isShowSpinner ?
            (<Spinner />) :
            this.createMyLocationTemplate(myLocation);

        return (
            <div className={`my-location-container flex column center ${myLocationClassStr}`}>
                <h4 className={`sub-title flex row center ${headerClassStr}`}>
                    <BiCurrentLocation />
                    <span>{headerText}</span>
                </h4>
                {elMyLocationTemplate}
            </div>
        )
    }
}

export default MyLocation
