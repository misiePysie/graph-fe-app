import axios from "axios";

if(process.env.APP_API_URI){
  axios.defaults.baseURL = process.env.APP_API_URI;
} else{
  axios.defaults.baseURL = "http://localhost:3030"; //TODO: change api URL when api releases
}

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
alert(error)
  // Do something with response error
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
  } else {
    switch (error.response.status) {
      case 401 :   alert("You are not authorized!");
        break;
      case 400 :    alert("Wrong API path!");
        break;
      case 404 :    alert("api path not exist!");
        break;
      default:
        alert(`An error occurred. ${error}`);
    }
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  put: axios.put,
  delete: axios.delete
};
