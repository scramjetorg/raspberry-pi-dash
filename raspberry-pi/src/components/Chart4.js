import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Chart4 = () => {
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
                label: "Placeholder 1",
                data: [344, 233, 125, 654, 345, 233, 432],
                backgroundColor: "rgba(230, 130, 15, 0.721",
                borderColor: "rgb(230,128,15)"
            },
            {
                label: "Placeholder 2",
                data: [234, 143, 245, 234, 765, 443, 322],
                borderColor: "rgb(37,119,191)",
                backgroundColor: "rgba(37, 119, 191, 0.726)"
            },
        ],
    };

    return (
        <div className="chartContainer">
            <Bar data={data} options={options}/>
        </div>
    );
};

export default Chart4;
