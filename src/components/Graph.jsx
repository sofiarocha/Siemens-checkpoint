import React from 'react';
import Plot from 'react-plotly.js';

const Graph = ({ forecast }) => {
    return (
        <div>
            <Plot
                data={[
                    {
                        x: forecast.map(day => day.dt_txt),
                        y: forecast.map(day => day.main.temp),
                        mode: 'lines+points',
                        marker: { color: 'red' },
                        name: "Temperature",
                    },
                ]}
                layout={{ width: 800, height: 500, title: 'Forecast' }}
            />
        </div>
    );
}

export default Graph;