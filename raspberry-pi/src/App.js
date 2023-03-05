import React from "react";
import Header from "./components/Header";
import Temperature from "./components/Temperature";
import DiskUsage from "./components/DiskUsage";
import CpuUsage from "./components/CPUUsage";

function App() {
    return (
        <div div className='container'>
            <Header title='Raspberry-pi data'/>
            <div className='flex-container'>
                <DiskUsage />
                <Temperature />
                <CpuUsage />
            </div>
        </div>
    );
}

export default App;
