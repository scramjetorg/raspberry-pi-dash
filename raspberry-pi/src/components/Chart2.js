import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart2 = () => {
    const data = {
        labels: ['Placeholder 1', 'Placeholder 2', 'Placeholder 3', 'Placeholder 4'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5],
            backgroundColor: [
              'rgba(230, 130, 15, 0.721)',
              'rgba(37, 119, 191, 0.726)',
              'rgba(59, 99, 140, 0.721)',
              'rgba(4, 45, 79, 0.721)',
            ],
            borderColor: [
              'rgb(230,128,15)',
              'rgb(37,119,191)',
              'rgb(59,99,140)',
              'rgb(4,45,79)',
            ],
            borderWidth: 1,
          },
        ],
      };
      const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Placeholder'
            },
        },
    };
    return (
        <div className='chartContainer'>
          
                <Doughnut data={data} options={options}/>

            
        </div>
    )
}

export default Chart2
