import React from 'react';
import Info from './components/info';
import Form from './components/form';
import Weather from './components/Weather';


const API_KEY = "f74e9feab96e7ff568de1200cd9cdb77";


class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
    error: undefined
  };
  
  getWeather = async () =>{
     fetch('https://api.ipgeolocation.io/ipgeo?apiKey=50a5b791e5c6400da962f8548caac2c7&lang=ru')
       .then(response => response.json())
       .then(data => data.city)
       .then(city => {
         fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
           .then(response => response.json())
           .then(data => {
             let sunset = data.sys.sunset * 1000;
             let date = new Date();
             date.setTime(sunset);
             let sunset_date = date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
  
             this.setState({
               temp: Math.floor(data.main.temp) + '°',
               city: data.name,
               country: data.sys.country,
               pressure: data.main.pressure,
               sunset: sunset_date,
               error: undefined
             })
           })
       })
   }
  
  gettingWeather = async (e) => {
    e.preventDefault();
    let city = e.target.elements.city.value;
    
    if (city) {
      const api_url = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await api_url.json();

      let sunset = data.sys.sunset * 1000;
      let date = new Date();
      date.setTime(sunset);
      let sunset_date = date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
      
      this.setState({
        temp: Math.floor(data.main.temp) + '°',
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure,
        sunset: sunset_date,
        error: undefined
      });
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        error: "Введите название города"
      });
    }
  };

  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
                <Info getWeather = {this.getWeather}/>
              </div>
              <div className="col-sm-7 form">
              <Form weatherMethod = {this.gettingWeather}/>
              <Weather
                temp = {this.state.temp}
                city = {this.state.city}
                country = {this.state.country}
                pressure = {this.state.pressure}
                sunset = {this.state.sunset}
                error = {this.state.error}
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
