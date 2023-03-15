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

const Chart5 = () => {
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: false,
            },
        },
    };
    const labels = ["1", "2", "3", "4", "5", "6", "7"];
    const data = {
        labels,
        datasets: [
            {
                label: "Placeholder",
                data: [23, 23, 13, -4, 14, 23, 34],
                borderColor: "rgb(37,119,191)",
                backgroundColor: "rgba(37, 119, 191, 0.726)",
            }
        ],
    };

    return (
        <div className="chartContainer">
            <Line data={data} options={options}/>
        </div>
    );
};

export default Chart5;
