import * as css from './style.css';
import * as vis from 'vis-network';
import http from "../../services/httpService";
import { mockData, mockData2 } from './mockData';
import { transformGraphData, pathReformer } from './helpers';

async function getProjectStructureData(){
  const frontendSrc = document.querySelector("#frontendAppPath").value;
  const backendSrc = document.querySelector("#backendAppPath").value;
  const srcData = {backendSrc, frontendSrc}
  return await http.post('/dir', srcData);
}

const populateGraph = (nodesData, edgesData) => {
  const container = document.getElementById('projectGraph');
  const nodes = new vis.DataSet(nodesData);
  const edges = new vis.DataSet(edgesData);

  const data = {
    nodes: nodes,
    edges: edges
  };

  const options = {
    nodes: {
      //shape: 'dot',
      color: "#6dc5ff",
      font: "16px arial white",
      borderWidth: 1
    },
    edges: {
      color: "#2998ff",
      font: {
        color: "#ffffff",
        size: 16,
      },
      arrows: {
        to: { enabled: true, scaleFactor: 0.5, type: "arrow" }
      }
    },
    physics: {
      enabled: false
    }
};
  const network = new vis.Network(container, data, options);
}

export const graphNetworkScript = () => {
  const graphNetworkButton = document.querySelector("#getProjectStructure");

  graphNetworkButton.onclick = () => {
      getProjectStructureData().then((response)=>{
        const {nodesData, edgesData} = transformGraphData(response.data);
        console.log(response.data);
        populateGraph(nodesData, edgesData);
      }, (error)=>{
        console.error(error);
        const {nodesData, edgesData} = transformGraphData(mockData);
        console.log('edges',edgesData);
        populateGraph(nodesData, edgesData);
      })
  }
}

const graphNetwork = () => `
<div id="graphWrapper">
<div id="graphOptionsWrapper">
<div> <h4>Options:</h4> </div>
Frontend App path: <input type="text" id="frontendAppPath"><br>
Backend App path: <input type="text" id="backendAppPath" name="fname"><br>
<button id="getProjectStructure"> Get project structure </button>
</div>
    <div id="projectGraph"></div>
</div>
`;

export default graphNetwork;