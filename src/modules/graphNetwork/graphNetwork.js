import { mockData, mockData2 } from './mockData';
import { transformGraphData, pathReformer, transformGraphFunctionsCallsData } from './helpers';
import { getProjectStructureData, getFunctionsCallsData, getModulesData } from './requests';
import { populateGraph } from './populateGraph';

let graphVariant = 'fileProjectStructure';

export const graphNetworkScript = () => {
  const getProjectDataButton = document.querySelector("#getProjectData");

  if (graphVariant === "fileProjectStructure") {
    getProjectDataButton.onclick = () => {
      getProjectStructureData().then((response) => {
        const { nodesData, edgesData } = transformGraphData(response.data);
        console.log(response.data);
        populateGraph(nodesData, edgesData);
      }, (error) => {
        console.error(error);
        const { nodesData, edgesData } = transformGraphData(mockData);
        console.log('edges', edgesData);
        populateGraph(nodesData, edgesData);
      })
    }
  }
  else if (graphVariant === "functionCall") {
    getProjectDataButton.onclick = () => {
      getFunctionsCallsData().then((response) => {
        const { nodesData, edgesData } = transformGraphFunctionsCallsData(response.data);
        console.log('nodes:', nodesData);
        console.log("edges:", edgesData);
        populateGraph(nodesData, edgesData);
      }, (error) => {
        console.error(error);
        const { nodesData, edgesData } = transformGraphData(mockData);
        console.log('edges', edgesData);
        populateGraph(nodesData, edgesData);
      })
    }
  }
  else if (graphVariant === "modules") {
    getProjectDataButton.onclick = () => {
      getModulesData().then((response) => {
        const { nodesData, edgesData } = transformGraphModulesData(response.data);
        console.log('nodes:', nodesData);
        console.log("edges:", edgesData);
        populateGraph(nodesData, edgesData);
      }, (error) => {
        console.error(error);
        const { nodesData, edgesData } = transformGraphData(mockData);
        console.log('edges', edgesData);
        populateGraph(nodesData, edgesData);
      })
    }
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
      <button id="fileProjectStructure" class="tabsButton tabsButtonActive"> Project file structure </button>
      <button id="functionCall" class="tabsButton"> Function calls </button>
      <button id="modules" class="tabsButton"> Modules </button>
    </div>
    <div id="projectGraph"></div>
  </div>
</div>
`;

export default graphNetwork;