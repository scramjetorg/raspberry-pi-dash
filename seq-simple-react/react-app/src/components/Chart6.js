import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const Chart6 = () => {
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Placeholder",
            },
        },
    };
    const labels = ["1", "2", "3", "4", "5", "6", "7"];
    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: "Placeholder",
                data: [45, 65, 23, 34, 76, 12, 32],
                borderColor: "rgb(230,128,15)",
                backgroundColor: "rgba(230, 130, 15, 0.721)",
            },
        ],
    };

    return (
        <div className="chartContainer">
            <Line data={data} options={options}/>
        </div>
    );
};

export default Chart6;

