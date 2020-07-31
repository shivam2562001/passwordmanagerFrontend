import http from './httpService';
import qs from 'querystring';
const apiEndpoint = "https://passmanager256.herokuapp.com/signup";

const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*"
  },
};

export function Register(user){
  return http.post(apiEndpoint,qs.stringify(user),config);
}