import { mockData, mockData2 } from './mockData';
import { transformGraphData, pathReformer, transformGraphFunctionsCallsData } from './helpers';
import { getProjectStructureData, getFunctionsCallsData, getModulesData, getModulesFilesMethodsData, postProcessApp, fetchConvertAndDownloadFile, getFileMethod, getMethodPackageData } from './requests';
import { populateGraph } from './populateGraph';
let file_file_checkbox;
let module_module;
let methods_methods;
let processProject;
let loadingWrapper;
let download_export_modules;

let graphVariant = 'fileProjectStructure';
export const setIsLoading = (isLoading) => {
  console.log('loadingWrapper', loadingWrapper);
  if (isLoading) {
    loadingWrapper.classList.add("isLoaderActive");
  } else {
    loadingWrapper.classList.remove("isLoaderActive");
  }
}

export const clearGraph = () => {
  populateGraph({}, {});
}

export const setGraphVariant = async (variant) => {
  console.log('SET')
  graphVariant = variant;

  if (graphVariant === "fileProjectStructure") {
    getProjectStructureData().then((response) => {
      console.log('tuuu', response);
      const { nodesData, edgesData } = transformGraphData(response.data);
      console.log(response.data);
      populateGraph(nodesData, edgesData);
    }, (error) => {
      clearGraph();
    })
  }
  else if (graphVariant === "functionCall") {

    getFunctionsCallsData().then((response) => {
      const { nodesData, edgesData } = transformGraphData(response.data);
      console.log('nodes:', nodesData);
      console.log("edges:", edgesData);
      populateGraph(nodesData, edgesData);
    }, (error) => {
      console.error(error);
      clearGraph();
    })
  }
  else if (graphVariant === "modules") {
    getModulesData().then((response) => {
      const { nodesData, edgesData } = transformGraphData(response.data);
      console.log('nodes:', nodesData);
      console.log("edges:", edgesData);
      populateGraph(nodesData, edgesData);
    }, (error) => {
      console.error(error);
      alert('Error');
      clearGraph();
    })
  }
  else if (graphVariant === "methodPackage") {
    getMethodPackageData().then((response) => {
      const { nodesData, edgesData } = transformGraphData(response.data);
      console.log('nodes:', nodesData);
      console.log("edges:", edgesData);
      populateGraph(nodesData, edgesData);
    }, (error) => {
      console.error(error);
      alert('Error');
      clearGraph();
    })
  }
  else if (graphVariant === "file_method") {
    getFileMethod().then((response) => {
      const { nodesData, edgesData } = transformGraphData(response.data);
      console.log('nodes:', nodesData);
      console.log("edges:", edgesData);
      populateGraph(nodesData, edgesData);
    }, (error) => {
      console.error(error);
      alert('Error');
      clearGraph();
    })
  }
  else if (graphVariant === "modules-files-methods") {
    clearGraph();

    try {
      const filesModelsMethodsData = await getModulesFilesMethodsData();
      console.log('ALL DATAA', filesModelsMethodsData);

      const handleDisplayLayerChange = () => {
        clearGraph();
        let displayData = { nodes: [], edges: [] };

        if (file_file_checkbox.checked) {
          displayData = {
            nodes: [...displayData.nodes, ...filesModelsMethodsData.file_file_result.nodes],
            edges: [...displayData.edges, ...filesModelsMethodsData.file_file_result.edges]
          }
        }

        if (module_module.checked) {
          displayData = {
            nodes: [...displayData.nodes, ...filesModelsMethodsData.modules_modules_result.nodes],
            edges: [...displayData.edges, ...filesModelsMethodsData.modules_modules_result.edges]
          }
        }

        if (methods_methods.checked) {
          displayData = {
            nodes: [...displayData.nodes, ...filesModelsMethodsData.function_function_result.nodes],
            edges: [...displayData.edges, ...filesModelsMethodsData.function_function_result.edges]
          }
        }





        console.log('displayData', displayData)
        const { nodesData, edgesData } = transformGraphData(displayData);
        console.log('nodes:', nodesData);
        console.log("edges:", edgesData);
        populateGraph(nodesData, edgesData);

      }
      file_file_checkbox.onclick = handleDisplayLayerChange;
      module_module.onclick = handleDisplayLayerChange;
      methods_methods.onclick = handleDisplayLayerChange;

    } catch (e) {
      clearGraph();
      alert('Error :(');
    }
  }
}

export const graphNetworkScript = async () => {
  file_file_checkbox = document.getElementById("file_file_checkbox");
  module_module = document.getElementById("module_module_checkbox");
  methods_methods = document.getElementById("methods_methods");
  processProject = document.querySelector('#processProject');
  loadingWrapper = document.querySelector("#loader");
  download_export_modules = document.querySelector("#download_export_modules");
  const download_export_files = document.querySelector("#download_export_files");
  const download_export_packages = document.querySelector("#download_export_packages");

  download_export_modules.onclick = async () => {
    await fetchConvertAndDownloadFile('export_modules', 'export_modules.xml');
  }

  download_export_files.onclick = async () => {
    await fetchConvertAndDownloadFile('export_files', 'export_files.xml');
  }

  download_export_packages.onclick = async () => {
    await fetchConvertAndDownloadFile('export_methods', 'export_methods.xml');
  }

  processProject.onclick = async () => {
    try {
      await postProcessApp();
    } catch (e) {
      console.log(':(')
    }
  }

}

const graphNetwork = () => `
<div id="graphWrapper">
<div class="inputOptionsWrapper">
App path: <br><br><input type="text" id="appPath" name="fname" size="30"><br>
<br/>
<button class="getProjectDataButton" id="processProject"> Process for this path </button>

<div id="graphOptionsWrapper" class="inputWrapperActive optionsWrapper">
<div>  </div>
</div>

  <div id="graphOptionsWrapper-modules-files-methods" class="optionsWrapper">
    <div> <br><br><br><h4>Options:</h4> </div>
     <div class="checkboxWrapper"> Files graph:  <input class="checkbox" type="checkbox" id="file_file_checkbox" name="files_files" value="files_files">  <br></div>
     <div class="checkboxWrapper"> Modules graph:  <input class="checkbox" type="checkbox" id="module_module_checkbox" name="methods_methods" value="methods_methods">  </div>
     <div class="checkboxWrapper"> Methods graph:  <input class="checkbox"type="checkbox" id="methods_methods" name="modules_modules" value="modules_modules">  <br></div>
     <br>
  </div>

  <div id="download-xml-wrapper" class="optionsWrapper inputWrapperActive">
    <div> <br><br><br><h4>Download files:</h4> </div>
    <h5 class="pointer" id="download_export_files">Files XML</h5>
    <h5 class="pointer" id="download_export_modules">Modules XML</h5>
    <h5 class="pointer" id="download_export_packages">Methods XML</h5>
  </div>

  </div>
  <div id="displayWrapper">
    <div id="tabs-wrapper">
      <button id="fileProjectStructure" class="tabsButton"> Project file structure </button>
      <button id="functionCall" class="tabsButton"> Function calls </button>
      <button id="modules" class="tabsButton"> Modules </button>
      <button id="file_method" class="tabsButton"> Methods </button>
      <button id="methodPackage" class="tabsButton"> Method-Package </button>
      <button id="modules-files-methods" class="tabsButton"> Files & Methods & Modules  </button>
      <button id="commit" class="tabsButton"> Version  </button>
    </div>
    <div id="loader" class="displayNone" ><div id="loaderCat"></div></div>
    <div id="projectGraph"></div>
  </div>
</div>
`;

export default graphNetwork;