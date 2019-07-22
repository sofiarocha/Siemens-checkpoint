import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import TodayWeather from './TodayWeather';
import Forecast from './Forecast';

const App = () => {
    return (
        <div>
            <Link to="/">Today</Link>
            <Link to="/forecast">Forecast</Link>
            <Switch>
                <Route exact path="/" component={TodayWeather} />
                <Route path="/forecast" component={Forecast} />
            </Switch>

        </div>
    );
};

export default App;
