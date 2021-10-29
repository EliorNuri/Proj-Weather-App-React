import React from 'react';
import { BsDroplet } from "react-icons/bs";
import { BiWind } from "react-icons/bi";
import { RiTempHotLine } from "react-icons/ri";

function ExtendedInfoRow({ humidity , pressure, windSpeed }) {
    const icons = [
        { icon: BiWind, txt: `${isNaN((1 / windSpeed)) ? `0 ` : (1 / windSpeed).toFixed(2)}km/h` },
        { icon: BsDroplet, txt: `${humidity || 0} %` },
        { icon: RiTempHotLine, txt: `${isNaN((1000 /pressure)) ? `0 ` :(1000 /pressure).toFixed(3)} mBar` },
    ];

    const elIcons = icons.map((obj,idx) => {
        return (
            <div className="icon-wrapper flex row center justify-start" key={idx}>
                <div className="icon-img">{obj.icon()}</div>
                <div className="icon-txt">{obj.txt}</div>
            </div>
        )
    })





    return (
        <div className="extended-info-row flex row center space-between">
            {elIcons}
        </div>
    )
}

export default ExtendedInfoRow;
