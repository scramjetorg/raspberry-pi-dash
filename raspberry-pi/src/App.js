import Header from "./components/Header";
import CpuUsage from "./components/CPU";
import DiskUsage from "./components/Disk";
import Temperature from "./components/Temperature";
import Chart from "./components/Chart";
import { useState } from "react";
import './App.css'

const tempArray = []
function App() {
  const [PiState, setPiState] = useState(0);

  function utf8ArrayToString(aBytes) {
      var sView = "";
      
      for (var nPart, nLen = aBytes.length-1, nIdx = 0; nIdx < nLen; nIdx++) {
          nPart = aBytes[nIdx];
          
          sView += String.fromCharCode(
              nPart > 251 && nPart < 254 && nIdx + 5 < nLen ? 
                  (nPart - 252) * 1073741824 + (aBytes[++nIdx] - 128 << 24) + (aBytes[++nIdx] - 128 << 18) + (aBytes[++nIdx] - 128 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
              : nPart > 247 && nPart < 252 && nIdx + 4 < nLen ? 
                  (nPart - 248 << 24) + (aBytes[++nIdx] - 128 << 18) + (aBytes[++nIdx] - 128 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
              : nPart > 239 && nPart < 248 && nIdx + 3 < nLen ? 
                  (nPart - 240 << 18) + (aBytes[++nIdx] - 128 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
              : nPart > 223 && nPart < 240 && nIdx + 2 < nLen ? 
                  (nPart - 224 << 12) + (aBytes[++nIdx] - 128 << 6) + aBytes[++nIdx] - 128
              : nPart > 191 && nPart < 224 && nIdx + 1 < nLen ?
                  (nPart - 192 << 6) + aBytes[++nIdx] - 128
              : 
                  nPart
          );
      }
      
      return sView;
  }

  async function* streamAsyncIterator(stream) {
    const reader = stream.getReader();

    try {
      while (true) {
        const {done, value} = await reader.read();
        if (done) return;
        yield value;
      }
    }
    finally {
      reader.releaseLock();
    }
  }

  var url ="http://192.168.1.27:8000/api/v1/topic/pi";
  const values = []
  async function asyncUpdatePiState() {
    const response = await fetch(url);
    for await (const chunk of streamAsyncIterator(response.body)) {
      setPiState(utf8ArrayToString(chunk))
    }
  }
 
  asyncUpdatePiState()
  
  JSON.parse(PiState, (key, value) => {
    values[key] = value;
    return value;
  }); 

  const temp = values[0];
  const disk = values[1];
  const cpu = values[2];

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
