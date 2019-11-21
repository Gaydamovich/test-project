import React from 'react';

const Info = props => (
  <div>
    <h2>Weather in your city</h2>
    <p>have a nice day</p>
    <button className={'btn'} onClick={props.getWeather}>Weather in your..</button>
  </div>
);

export default Info;
