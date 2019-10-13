import * as css from './style.css';
import * as vis from 'vis-network';
import http from "../../services/httpService";

// temporary mock data
const nodesMockData = [
  {id:'./src/1', label: 'Node 1'},
  {id:'./src/2', label: 'Node 2'},
  {id:'./src/3', label: 'Node 3'},
  {id:'./src/4', label: 'Node 4'},
  {id:'./src/5', label: 'Node 5'}
]
const edgesMockData = [
  {from: './src/1', to: './src/3'},
  {from: './src/1', to: './src/2'},
  {from: './src/2', to: './src/4'},
  {from: './src/2', to: './src/5'},
  {from: './src/3', to: './src/3'}
]

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

  const options = {};
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
          populateGraph(nodesMockData, edgesMockData); // TODO: this display graph onError should be removed when api will be released
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