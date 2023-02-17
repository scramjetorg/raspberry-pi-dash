import React from "react";
import Header from "./components/Header";
import Chart1 from "./components/Chart1";
import Chart2 from "./components/Chart2";
import Chart3 from "./components/Chart3";
import Chart4 from "./components/Chart4";
import Chart5 from "./components/Chart5";
import Chart6 from "./components/Chart6";
function App() {
    return (
        <div div className='container'>
            <Header title='Raspberry-pi data'/>
            <div className='flex-container'>
                <Chart1 />
                <Chart2 />
                <Chart3 />
                <Chart4 />
                <Chart5 />
                <Chart6 />
            </div>
        </div>
    );
}

export default App;
