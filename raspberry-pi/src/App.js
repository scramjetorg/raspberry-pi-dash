import Header from "./components/Header";
import CpuUsage from "./components/CPU";
import DiskUsage from "./components/Disk";
import Temperature from "./components/Temperature";
import Chart from "./components/Chart";
import { useState } from "react";
import './App.css'

const tempArray = [];
function App() {
//   const [PiState, setPiState] = useState(0);



// componentDidMount() {
//   this.callBackendAPI()
//     .then(res => this.setState({ data: res.express }))
//     .catch(err => console.log(err));
// };
//   // fetching the GET route from the Express server which matches the GET route from server.js
// callBackendAPI = async () => {
//   const response = await fetch('/express_backend');
//   const body = await response.json();

//   if (response.status !== 200) {
//     throw Error(body.message) 
//   }
//   return body;
// };

//   async function* streamAsyncIterator(stream) {
//     const reader = stream.getReader();

//     try {
//       while (true) {
//         const {done, value} = await reader.read();
//         if (done) return;
//         yield value;
//       }
//     }
//     finally {
//       reader.releaseLock();
//     }
//   }

//   var url ="http://192.168.1.27:8000/api/v1/topic/pi";
  const values = []
//   async function asyncUpdatePiState() {
//     const response = await fetch(url);
//     for await (const chunk of streamAsyncIterator(response.body)) {
//       setPiState(chunk)
//     }
//   }
 
//   asyncUpdatePiState()
  
//   JSON.parse(PiState, (key, value) => {
//     values[key] = value;
//     return value;
//   }); 

  const temp = values[0];
  const disk = values[1];
  const cpu = values[2];

//   if (tempArray.length < 7 && !isNaN(temp)) {
//     tempArray.push(temp);
//   } else if(!isNaN(temp)) {
//     tempArray.splice(0, 1); 
//     tempArray.push(temp); 
//   }

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
