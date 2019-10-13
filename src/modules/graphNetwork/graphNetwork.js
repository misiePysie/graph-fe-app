import * as css from './style.css';
import * as vis from 'vis-network';
import http from "../../services/httpService";
import { mockData } from './mockData';
import { transformGraphData } from './helpers';

async function getProjectStructureData(){
  return await http.get('/path-to-api');
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
      font: {
        size: 8
      },
      borderWidth: 0.8
    },
    edges: {
      font: {
        align: "top"
      },
      arrows: {
        to: { enabled: true, scaleFactor: 1, type: "arrow" }
      }
    },
    interaction: {
      tooltipDelay: 200,
      hover: true
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
        const {nodesData, edgesData} = response.data;
        console.log(response.data);
        populateGraph(nodesData, edgesData);
      }, (error)=>{
        console.error(error);
          const {nodesData, edgesData} = transformGraphData(mockData);
          populateGraph(nodesData, edgesData); // TODO: this display graph onError should be removed when api will be released
      })
  }
}

const graphNetwork = () => `
<div id="graphWrapper">
<div id="graphOptionsWrapper">
<div> <h4>Graph options:</h4> </div>
<button id="getProjectStructure"> Get project structure </button>
</div>
    <div id="projectGraph"></div>
</div>
`;

export default graphNetwork;