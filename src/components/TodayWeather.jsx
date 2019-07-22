import React, { Component } from 'react';

class TodayWeather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todayWeather: {},
            isLoading: true,
            city: "Lisbon",
            countryCode: "pt",
        };
    }

    componentDidMount () {
        this.getTodayWeather();
    }

    getTodayWeather = () => {
        const { city, countryCode } = this.state;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=9d92245d08bdc72ed4ac970627d76d46&units=metric`;
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({
                todayWeather: data,
                isLoading: false,
            }));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.getTodayWeather();
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    showResults = () => {
        const { todayWeather, city, countryCode } = this.state;
        return (
            <div className="weather-details">
                <h1>{`Weather in ${city}, ${countryCode}`}</h1>
                <p>{`Temp: ${todayWeather.main.temp}`}</p>
                <p>{`Sunrise: ${new Date(todayWeather.sys.sunrise * 1000).getHours()}:${new Date(todayWeather.sys.sunrise * 1000).getMinutes()}`}</p>
                <p>{`Sunset: ${new Date(todayWeather.sys.sunset * 1000).getHours()}:${new Date(todayWeather.sys.sunset * 1000).getMinutes()}`}</p>
            </div>
        );
    }

    render() {
        const { isLoading, todayWeather, city, countryCode } = this.state;
        if (isLoading) {
            return <p>LOADING ...</p>;
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="city"
                        placeholder="Enter a city"
                        onChange={this.handleChange}
                        value={city}
                        autoComplete="off"
                    />
                    <input
                        type="text"
                        name="countryCode"
                        placeholder="Enter the country code"
                        onChange={this.handleChange}
                        value={countryCode}
                        autoComplete="off"
                    />
                    <input type="submit" value="Search" />
                </form>
                {todayWeather ? this.showResults() : null}
            </div>
        );
    }
}

export default TodayWeather;
