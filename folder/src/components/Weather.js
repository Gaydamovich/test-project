import React from 'react';

const Weather = props => (
  <div className= "infoWeath">
    {props.city &&
      <div>
        <p><span>Locality: </span> {props.city}, {props.country}</p>
        <p><span>Temperature: </span> {props.temp}</p>
        <p><span>Pressure: </span> {props.pressure}</p>
        <p><span>Sunset: </span> {props.sunset}</p>
      </div>
    }
    <p className="error">{props.error}</p>
  </div>
);

export default Weather;
