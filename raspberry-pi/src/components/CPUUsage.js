import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const CpuUsage = () => {
    const data = {
        labels: ["CPU in use"],
        datasets: [
            {
                data: [24, 76],
                backgroundColor: [
                    "rgba(23, 112, 201, 0.8)",
                    "rgba(23, 112, 201, 0.3)",
                ],
                borderColor: [
                    "rgb(23, 112, 201, 255)",
                    "rgba(23, 112, 201, 0.4)",
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
                text: "CPU usage"
            },
        },
    };

    return (
        <div className='chartContainer'>
            <Doughnut data={data} options={options}/>
        </div>
    );
};

export default CpuUsage;
