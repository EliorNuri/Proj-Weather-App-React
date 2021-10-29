import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { RiHome2Line, RiSettings5Line } from "react-icons/ri";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";
import { TiLocationArrowOutline } from "react-icons/ti";

export class AppMenu extends Component {

    moveToPage = (path) => {
        const { history } = this.props;
        history.push(path);
    }

    createAppMenuIconsTemplate = () => {
        const icons = [
            RiHome2Line,
            TiLocationArrowOutline,
            AiOutlineHeart,
            HiOutlineLocationMarker,
            RiSettings5Line
        ];
        const routes = ['/', '/discover', '/favorites', '/mylocation', '/settings'];

        return icons.map((icon, idx) => {
            return (
                <div className="app-menu-icon" onClick={() => { this.moveToPage(routes[idx]) }} key={idx}>
                    {icon()}
                </div>
            )
        })
    }

    render() {
        return (
            <div className="app-menu flex row center space-evenly">
                {this.createAppMenuIconsTemplate()}
            </div>
        )
    }
}

export default withRouter(AppMenu);
