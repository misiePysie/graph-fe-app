import * as css from './style.css';
import * as vis from 'vis-network';
import http from "../../services/httpService";

// temporary mock data
const nodesMockData = [
  {id: 1, label: 'Node 1'},
  {id: 2, label: 'Node 2'},
  {id: 3, label: 'Node 3'},
  {id: 4, label: 'Node 4'},
  {id: 5, label: 'Node 5'}
]
const edgesMockData = [
  {from: 1, to: 3},
  {from: 1, to: 2},
  {from: 2, to: 4},
  {from: 2, to: 5},
  {from: 3, to: 3}
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