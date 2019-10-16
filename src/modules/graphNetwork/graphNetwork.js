import * as css from './style.css';
import * as vis from 'vis-network';
import http from "../../services/httpService";
import { mockData } from './mockData';
import { transformGraphData } from './helpers';

const srcRegex = `/\^(?:[a-zA-Z]\:|\\\\[\w\.]+\\[\w.$]+)\\(?:[\w]+\\)*\w([\w.])+$/`; // TODO: Validation 

async function getProjectStructureData(){

  const frontedSrc = document.querySelector("#frontendAppPath").value;
  const backendSrc = document.querySelector("#backendAppPath").value;

  const valid = frontedSrc.match(srcRegex) && backendSrc.match(srcRegex);

  // if(!valid){
  //   alert('Co żeś ty mi podał?!')
  //   return
  // } 

  console.log(frontedSrc, backendSrc)

  const srcData = {backendSrc, frontedSrc}
  return await http.get('/dir', srcData);
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
      shape: 'dot',
      color: "#6dc5ff",
      font: {
        size: 8,
        color: '#ffffff'
      },
      borderWidth: 8
    },
    edges: {
      color: "#2998ff",
      font: {
        align: "top",
        color: "#ffffff"
      },
      arrows: {
        to: { enabled: true, scaleFactor: 1, type: "arrow" }
      }
    },
    physics: {
      enabled: true
    }
};
  const network = new vis.Network(container, data, options);
}

export const graphNetworkScript = () => {
  const graphNetworkButton = document.querySelector("#getProjectStructure");

  graphNetworkButton.onclick = () => {
      getProjectStructureData().then((response)=>{
        const {nodesData, edgesData} = response.data;
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