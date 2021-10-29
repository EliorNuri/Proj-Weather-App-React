import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import utilService from '../services/utilService';

class SunriseSunsetCmp extends PureComponent {

    state = {
        data: [
            {
                name: 'Page A',
                uv: 4000,
                pv: 1100,
                amt: 2200,
            },
            {
                name: 'Page B',
                uv: 3000,
                pv: 1050,
                amt: 2200,
            },
            {
                name: 'Page C',
                uv: 2000,
                pv: 700,
                amt: 2200,
            },
            {
                name: 'Page D',
                uv: 1000,
                pv: 500,
                amt: 2200,
            },
            {
                name: 'Page E',
                uv: 0,
                pv: 450,
                amt: 2200,
            }
        ]
    }


    render() {
        const { data } = this.state;
        const { sunriseAsSec, sunsetAsSec } = this.props;
        //Multiple in 1000 - miliseconds
        let [sunriseHour, sunriseStr] = (sunriseAsSec) ? utilService.formatHours(new Date(sunriseAsSec * 1000).getHours()) : utilService.formatHours(0);
        let [sunsetHour, sunsetStr] = (sunsetAsSec) ? utilService.formatHours(new Date(sunsetAsSec * 1000).getHours()) : utilService.formatHours(0);


        return (
            <div className="sunrise-sunset-container">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart width={300} height={100} data={data}>
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
                        <ReferenceLine label="Segment" stroke="green" strokeDasharray="3 3" segment={[{ x: 10, y: 0 }, { x: 200, y: 300 }]} />
                    </LineChart>
                </ResponsiveContainer>
                <div className="sunrise-content flex row center space-between">
                    <div className="inner-time-circle sunrise-circle"></div>
                    <div className="inner-time-content">{sunriseHour} {sunriseStr}</div>
                </div>
                <div className="sunset-content  flex row center space-between">
                    <div className="inner-time-content">{sunsetHour} {sunsetStr}</div>
                    <div className="inner-time-circle sunset-circle"></div>
                </div>

            </div>
        );
    }
}

export default SunriseSunsetCmp;
