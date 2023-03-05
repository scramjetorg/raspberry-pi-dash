import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DiskUsage = () => {
    const data = {
        labels: ["Storage in use"],
        datasets: [
            {
                data: [13, 87],
                backgroundColor: [
                    "rgba(230, 130, 15, 0.721)",
                    "rgba(230, 130, 15, 0.3)",
                ],
                borderColor: [
                    "rgb(230,128,15)",
                    "rgba(230, 130, 15, 0.2)",
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
                text: "Disk usage"
            },
        },
    };

    return (
        <div className='chartContainer'>
            <Doughnut data={data} options={options}/>
        </div>
    );
};

export default DiskUsage;
