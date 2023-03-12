import React from 'react'
import { Bar } from 'react-chartjs-2';

function ScoresBarChart({chartData}) {
  return (
    <div className="chart-container">
        <Bar
            data={chartData}
            options={{
                plugins: {
                title: {
                    display: true,
                    text: "Ideas Before & After Prompts"
                }
                }
            }}
        />
    </div>
);
}

export default ScoresBarChart