import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaCity } from "react-icons/fa";
import { setDefaultLocationCity } from '../actions/weatherActions';
import utilService from '../services/utilService';
// import { FiVideo,FiVideoOff } from "react-icons/fi";
// import {MOBILE_CELLING_VIEWPORT} from '../services/constantsService';

export class Settings extends Component {
    state = {
        localDefaultLocationName: '',
        isShowDefaultLocationMsg: false,
        isLocationFound: false
    }

    componentDidMount() {
        const { defaultLocation } = this.props;
        this.setState({
            localDefaultLocationName: defaultLocation.name
        })
    }

    handleKeyPress = (e) => {
        if (e.keyCode === 13) this.setDefaultLocation();
    }

    setLocalDefaultLocationName = (e) => {
        const { value } = e.target;
        this.setState({
            localDefaultLocationName: value
        })
    }

    setDefaultLocation = async () => {
        const { localDefaultLocationName } = this.state;
        const { setDefaultLocationCity } = this.props;
        //Object return from dispatch fucntion is truthy 
        const isLocationFound = !!(await setDefaultLocationCity(localDefaultLocationName));
        this.setState({
            isLocationFound,
            isShowDefaultLocationMsg: true
        }, () => {
            setTimeout(() => {
                this.setState({
                    isShowDefaultLocationMsg: false
                })
            }, 3000)
        })
    }

    render() {
        const { localDefaultLocationName, isShowDefaultLocationMsg, isLocationFound } = this.state;
        const elMsg = isShowDefaultLocationMsg ?
            (isLocationFound) ?
                (<h4 className="sub-title success">Default Location Updted</h4>) :
                (<h4 className="sub-title alert">Cant Find Location ... </h4>)
            : null;

        return (
            <div className="settings-container flex column center justify-start">
                <div className="settings-header flex row center space-between  align-start">
                    <h4 className="sub-title setting-title">Weather App Settings</h4>
                    <div onClick={this.setDefaultLocation} className="base-btn flex row center">
                        <span>
                            Apply
                        </span>
                    </div>
                </div>
                <div className={`row-setting flex column center align-start`}>
                    <h4 className="row-setting-key">* Default Location (City) </h4>
                    <div className="input-field-wrapper flex row center space-between">
                        <span className="settings-input-icon flex row center"> <FaCity /></span>
                        <input onKeyUp={(e) => { this.handleKeyPress(e) }} className="settings-input" value={localDefaultLocationName} onChange={(e) => { this.setLocalDefaultLocationName(e) }} />
                    </div>
                    {elMsg}
                </div>

                {/* TODO - Add Video As Background Option */}
                {/* <div className={`row-setting flex column center align-start`}>
                    <h4 className="row-setting-key">* Set Background Video</h4>
                    <div className="video-toggle flex row center space-between">
                        <span onClick={this.toggleBackgroundVideo(true)}><FiVideo /></span>
                        <span onClick={this.toggleBackgroundVideo(false)}><FiVideoOff /></span>
                    </div>
                </div> */}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { defaultLocation } = state.weather;
    return {
        defaultLocation
    }
}

const mapDispatchToProps = {
    setDefaultLocationCity
}


export default connect(mapStateToProps, mapDispatchToProps)(Settings);
