import * as css from './style.css';
import * as vis from 'vis-network';
import http from "../../services/httpService";
import { mockData, mockData2 } from './mockData';
import { transformGraphData, pathReformer, transformGraphFunctionsCallsData } from './helpers';


let graphVariant = 'fileProjectStructure';

async function getProjectStructureData(){
  const frontendSrc = pathReformer(document.querySelector("#backendAppPath").value);
  const backendSrc = pathReformer(document.querySelector("#backendAppPath").value);
  const srcData = {backendSrc, frontendSrc}
  return await http.post('/dir', srcData);
}

async function getFunctionsCallsData(){
  const path = pathReformer(document.querySelector("#backendAppPath").value);
  console.log({path})
  return await http.post('/calls', {path});
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
  const getProjectDataButton = document.querySelector("#getProjectData");

  if(graphVariant === "fileProjectStructure"){
    getProjectDataButton.onclick = () => {
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
  else if (graphVariant === "functionCall"){
    getProjectDataButton.onclick = () => {
      getFunctionsCallsData().then((response)=>{
        const {nodesData, edgesData} = transformGraphFunctionsCallsData(response.data);
        console.log('nodes:',nodesData);
        console.log("edgesData:",edgesData);
        populateGraph(nodesData, edgesData);
      }, (error)=>{
        console.error(error);
        const {nodesData, edgesData} = transformGraphData(mockData);
        console.log('edges',edgesData);
        populateGraph(nodesData, edgesData);
      })
  }
  }

}

const clearButtonActive = () =>{
  const graphFilesNetworkButton = document.querySelector("#fileProjectStructure");
  const functionsCallsButton = document.querySelector("#functionCall");

  graphFilesNetworkButton.classList.remove("tabsButtonActive");
  functionsCallsButton.classList.remove("tabsButtonActive");
}

export const tabsScript = () => {
  const graphFilesNetworkButton = document.querySelector("#fileProjectStructure");
  const functionsCallsButton = document.querySelector("#functionCall");
  graphFilesNetworkButton.onclick = () => {
    clearButtonActive();
    graphVariant = 'fileProjectStructure';
    graphFilesNetworkButton.classList.add( "tabsButtonActive");
    graphNetworkScript();
  }

  functionsCallsButton.onclick = () => {
    clearButtonActive();
    graphVariant = 'functionCall';
    functionsCallsButton.classList.add("tabsButtonActive");
    graphNetworkScript();
  }
}



const graphNetwork = () => `
<div id="graphWrapper">
  <div id="graphOptionsWrapper">
    <div> <h4>Options:</h4> </div>
     App path: <input type="text" id="backendAppPath" name="fname"><br>
    <button id="getProjectData"> Get project structure </button>
  </div>
  <div id="displayWrapper">
    <div id="tabs-wrapper">
      <button id="fileProjectStructure" class="tabsButton tabsButtonActive"> File project structure </button>
      <button id="functionCall" class="tabsButton"> Function call </button>
    </div>
    <div id="projectGraph"></div>
  </div>
</div>
`;

export default graphNetwork;