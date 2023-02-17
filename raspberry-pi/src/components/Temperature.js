import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Temperature = () => {
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Temperature"
            },
        },
    };
    const labels = ["1", "2", "3", "4", "5", "6", "7"];
    const data = {
        labels,
        datasets: [
            {
                label: "CPU Temperature [C\u00B0]",
                data: [10, 24, 21, 35, 32, 41, 28],
                borderColor: "rgba(23, 112, 201, 0.9)",
                backgroundColor: "rgba(23, 112, 201, 0.8)",
            }
        ],
    };

    return (
        <div className='chartContainer'>
            <Line data={data} options={options}/>
        </div>
    );
};

export default Temperature;
