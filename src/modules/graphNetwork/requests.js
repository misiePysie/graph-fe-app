import http from "../../services/httpService";
import { pathReformer } from './helpers';
import { setIsLoading } from './graphNetwork';
import { download } from './download';


export async function postProcessApp() {
  try {
    const path = pathReformer(document.querySelector('#appPath').value);
    console.log({ path })
    setIsLoading(true);
    const res = await http.post('/path', { path });
    console.log(res);
    setIsLoading(false);
    return res;
  } catch (e) {
    setIsLoading(false);
    throw (e);
  }
}

export async function getCommitHash() {
  try {
    setIsLoading(true);
    const res = await http.get('/commitHash');
    setIsLoading(false);
    document.getElementById("commitField").innerHTML = "GIT Commit Hash:  " + res.data;
    return res;
  }
  catch (e) {
    setIsLoading(false);
    document.getElementById("commitField").innerHTML = "GIT Commit Hash: uknown";
    throw (e);
  }
}

export async function getProjectStructureData() {
  try {
    setIsLoading(true);
    const res = await http.get('/file_file');
    setIsLoading(false);
    return res;
  }
  catch (e) {
    setIsLoading(false);
    throw (e);
  }
}

export async function getFunctionsCallsData() {
  try {
    setIsLoading(true);
    const res = await http.get('/method_method');
    setIsLoading(false);
    return res;
  } catch (e) {
    setIsLoading(false);
    throw (e);
  }
}

export async function getModulesData() {
  try {
    setIsLoading(true);
    const res = await http.get('/package_package');
    setIsLoading(false);
    return res;
  } catch (e) {
    setIsLoading(false);
    throw (e);
  }
}

export async function getMethodPackageData() {
  try {
    setIsLoading(true);
    const res = await http.get('/method_package');
    setIsLoading(false);
    return res;
  } catch (e) {
    setIsLoading(false);
    throw (e);
  }
}

export const getModulesFilesMethodsData = () => new Promise(async (resolve, reject) => {
  try {
    setIsLoading(true);
    const function_function_result = await getFunctionsCallsData();
    const file_file_result = await getProjectStructureData();
    const modules_modules_result = await getModulesData();
    const method_package_result = await getMethodPackageData();
    setIsLoading(false);
    resolve({
      function_function_result: function_function_result.data,
      file_file_result: file_file_result.data,
      modules_modules_result: modules_modules_result.data,
      method_package_result: method_package_result.data
    });
  } catch (e) {
    setIsLoading(false);
    reject(e);
  }
});

export async function getFileMethod() {
  try {
    setIsLoading(true);
    const res = await http.get('/file_method');
    setIsLoading(false);
    return res;
  } catch (e) {
    setIsLoading(false);
    throw (e);
  }
}


export const fetchConvertAndDownloadFile = async (filePath, fileName) => {
  try {
    const res = await http.get(`/${filePath}`);
    download(res.data, fileName);
    return res;
  } catch (e) {
    console.log('no zle jest')
  }

}