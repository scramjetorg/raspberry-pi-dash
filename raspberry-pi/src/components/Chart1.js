import React from 'react'
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const Chart1 = () => {
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Placeholder'
            },
        },
    };
    const labels = ['1', '2', '3', '4', '5', '6', '7'];
    const data = {
         labels,
         datasets: [
           {
             label: 'Placeholder',
             data: [1, 5, 2, 5, 2, 4, 5],
             borderColor: 'rgb(230,128,15)',
             backgroundColor: 'rgba(230, 130, 15, 0.721)',
           }
        ],
    };
    return (
        <div className='chartContainer'>
            <Line data={data} options={options}/>
        </div>
    )
}

export default Chart1
