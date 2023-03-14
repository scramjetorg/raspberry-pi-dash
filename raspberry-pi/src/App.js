import Header from "./components/Header";
import CpuUsage from "./components/CPU";
import DiskUsage from "./components/Disk";
import Temperature from "./components/Temperature";
import Chart from "./components/Chart";
import './App.css'

function App() {
  return (
    <div className="content">
      <Header title="Raspberry-pi dash" className="header"/>
      <div className="container">
        <Chart title="CPU Usage" chart={<CpuUsage />}/>
        <Chart title="Temperature" chart={<Temperature />}/>
        <Chart title="Disk Usage" chart={<DiskUsage />}/>
      </div>
    </div>
  );
}

export default App;
