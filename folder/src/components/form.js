import React from 'react';

const Form = props => (
  <form onSubmit={props.weatherMethod}>
    <input type="text" name="city" placeholder="Город"/>
    <button className={'btn_get'}>Get weather</button>
  </form>
)

export default Form;
