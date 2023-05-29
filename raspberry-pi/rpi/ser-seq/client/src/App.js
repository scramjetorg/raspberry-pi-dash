import Header from "./components/Header";
import CpuUsage from "./components/CPU";
import DiskUsage from "./components/Disk";
import Temperature from "./components/Temperature";
import Chart from "./components/Chart";
import { useState } from "react";
import './App.css'


var temp = 0;
var disk = 0;
var cpu = 0;
const tempArray = [];

const socket = new WebSocket(
  "ws://<your-device-ip>:3000",
  "protocolOne"
);

function App() {
const [PiState, setPiState] = useState(0);



socket.onmessage = function(event) {
  setPiState(Math.random() * 60);
  var obj = JSON.parse(event.data);
  var hold = JSON.parse(obj);
  temp = hold.cpu_temp;
  disk = hold.disk_usage;
  cpu = hold.load_avg;
  if (tempArray.length < 7 && !isNaN(temp)) {
    tempArray.push(temp);
  } else if(!isNaN(temp)) {
    tempArray.splice(0, 1); 
    tempArray.push(temp); 
  }
}



  return (
    <div className="content">
      <Header title="Raspberry-pi dash" className="header"/>
      <div className="container">
        <Chart title="CPU Usage" chart={<CpuUsage CPUData={[parseFloat(cpu), 100-parseFloat(cpu)]}/>}/>
        <Chart title="Temperature" chart={<Temperature tempData={tempArray} />} />
        <Chart title="Disk Usage" chart={<DiskUsage diskData={[parseFloat(disk), 100-parseFloat(disk)]}/>}/>
      </div>
    </div>
  );
}

export default App;
