import http from "./httpService";
import jwtDecode from "jwt-decode";

import { BASE_URL } from '../shared/baseUrl';

const loginUrl = BASE_URL + "auth";

const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(loginUrl, { email, password });
  localStorage.setItem(tokenKey, jwt.token);
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
  getCurrentUser,
  getJwt
};
