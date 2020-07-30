import http from "./httpService";
import qs from "querystring";
const apiEndpoint = "https://passmanager256.herokuapp.com/savepassword";
const getapiEndpoint = "https://passmanager256.herokuapp.com/getpassword";
const deleteApiEndpoint = "https://passmanager256.herokuapp.com/deletepassword";

const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

 function savePassword(data) {
  return http.post(apiEndpoint, qs.stringify(data), config);
}

function getPassword(){
  return http.get(getapiEndpoint);
}

function deletePassword(ID){
  const data={
    ID:ID,
  }
  return http.post(deleteApiEndpoint,qs.stringify(data),config);
}

function getPasswordDetails(Id){
  return http.get(`https://passmanager256.herokuapp.com/${Id}`);
}

function editPassword(Id,data){
  return http.put(
    `https://passmanager256.herokuapp.com/${Id}`,
    qs.stringify(data),
    config
  );
}

export default {
  savePassword,
  getPassword,
  deletePassword,
  getPasswordDetails,
  editPassword,
};
