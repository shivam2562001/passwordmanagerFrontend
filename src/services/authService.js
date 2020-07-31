import jwtDecode from "jwt-decode";
import http from "./httpService";
import qs from 'querystring'

const apiEndpoint = "https://passmanager256.herokuapp.com/login";

const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
  },
};
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const postData={
    email,
    password
  }
  const { data: jwt } = await http.post(
    apiEndpoint,
   qs.stringify(postData) ,
    config
  );
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
