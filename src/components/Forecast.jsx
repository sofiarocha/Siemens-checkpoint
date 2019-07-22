import React, { Component } from 'react';
import Graph from './Graph';

class Forecast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forecast: [],
            isLoading: true,
            city: "",
            countryCode: "",
        };
    }

    componentDidMount () {
        this.getForecast();
    }

    getForecast = () => {
        const { city, countryCode } = this.state;
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=9d92245d08bdc72ed4ac970627d76d46&units=metric`;
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({
                forecast: data.list,
                isLoading: false,
            }));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.getForecast();
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    render() {
        const { isLoading, city, countryCode, forecast } = this.state;
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
                {forecast ? <Graph forecast={forecast} /> : null}
            </div>
        );
    }
}

export default Forecast;
