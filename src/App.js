import React from "react"
import './App.css';
import "weather-icons/css/weather-icons.css"
import "bootstrap/dist/css/bootstrap.min.css"
import Weather from "./weather_component/weather.component";

// api call api.openweathermap.org
const API_key= "e00c66dd20da94aebfce6e8ed628c93b";

class App extends React.Component{
  constructor(){
    super();
    this.state={
      city:undefined,
      country: undefined,
      icon:undefined,
      main:undefined,
      celsius:undefined,
      temp_max:undefined,
      temp_min:undefined,
      description:"",
      error:false
    };
    this.getWeather();

    this.weatherIcon = {
      thunderstorm:" wi-thunderstorm",
      Dizzle:"wi-sleet",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog",
     
    }
  }

   calcelsius= (temp)=>{
    let cell = Math.floor(temp-273.15)
    return cell
  }

  get_WeatherIcon (icon, rangeId){
    switch(true){
      case rangeId>=200 && rangeId <=232:
        this.setState({icon:this.weatherIcon.thunderstorm});
        break;
        case rangeId>=300 && rangeId <=321:
        this.setState({icon:this.weatherIcon.Dizzle});
        break;
        case rangeId>= 500 && rangeId <=531:
        this.setState({icon:this.weatherIcon.Rain});
        break;
        case rangeId >= 600 && rangeId <=622:
        this.setState({icon:this.weatherIcon.Snow});
        break;
        case rangeId>= 701 && rangeId <=781:
        this.setState({icon:this.weatherIcon.Atmosphere});
        break;
        case rangeId= 800:
        this.setState({icon:this.weatherIcon.Clear});
        break;
        case rangeId>= 801 && rangeId <=804:
        this.setState({icon:this.weatherIcon.Clouds});
        break;

        default:
          this.setState({icon:this.weatherIcon.Clouds})

    }
  }
  getWeather = async ()=>{
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=London,UK &appid=${API_key} `
    )
    const response =await api_call.json();

    console.log(response);

    this.setState({
      city:response.name,
      country:response.sys.country,
      celsius:this.calcelsius(response.main.temp),
      temp_min:this.calcelsius(response.main.temp_min),
      temp_max:this.calcelsius(response.main.temp_max),
      description:response.weather[0].description,

    });

    this.get_WeatherIcon(this.weatherIcon, response.weather[0].id)
  }
  



render(){
  return (
    <div className="App">
      <Weather city={this.state.city}
       country={this.state.country}
       temp_celsius={this.state.celsius}
       temp_min={this.state.temp_min}
       temp_max={this.state.temp_max}
       description={this.state.description}
       weatherIcon={this.state.icon}
       />
    </div>
  );
  }
}
export default App;
