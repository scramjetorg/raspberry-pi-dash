import Header from "./components/Header";
import CpuUsage from "./components/CPU";
import DiskUsage from "./components/Disk";
import Temperature from "./components/Temperature";
import Chart from "./components/Chart";
import { useState } from "react";
import './App.css'
//webSocket = new WebSocket(url, protocols);

const tempArray = [];
function App() {
const [PiState, setPiState] = useState(0);

const socket = new WebSocket(
  "ws://localhost:3000",
  "protocolOne"
);

const values = []


socket.onmessage = function(event) {
  console.log(event.data);
  
  //JSON.parse(key,value)
  setPiState(event.data);
  const temp = Math.random() * 60; //values[0];
  const disk = Math.random() * 60;//values[1];
  const cpu = Math.random() * 60;//values[2];
  JSON.parse(PiState, (key, value) => {
    values[key] = value;
    
   return value;
 }); 

}

const temp = Math.random() * 60; //values[0];
const disk = Math.random() * 60;//values[1];
const cpu = Math.random() * 60;//values[2];
  




  if (tempArray.length < 7 && !isNaN(temp)) {
    tempArray.push(temp);
  } else if(!isNaN(temp)) {
    tempArray.splice(0, 1); 
    tempArray.push(temp); 
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
