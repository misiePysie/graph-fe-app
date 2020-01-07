import http from "../../services/httpService";
import { pathReformer } from './helpers';

export async function getProjectStructureData(){
    const frontendSrc = pathReformer(document.querySelector("#backendAppPath").value);
    const backendSrc = pathReformer(document.querySelector("#backendAppPath").value);
    const srcData = {backendSrc, frontendSrc}
    return await http.post('/dir', srcData);
  }
  
  export async function getFunctionsCallsData(){
    const path = pathReformer(document.querySelector("#backendAppPath").value);
    console.log({path})
    return await http.post('/calls', {path});
  }
  
  export async function getModulesData(){
    const path = pathReformer(document.querySelector("#backendAppPath").value);
    console.log({path})
    return await http.post('/modules', {path});
  }