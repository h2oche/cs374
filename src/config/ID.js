import Cookies from 'universal-cookie';

var cookies = new Cookies();

export const getLoginId = () => {
  return cookies.get("LOGIN_ID");
}

export const getLoginName = () => {
  return cookies.get("LOGIN_NAME");
}

export const setLoginId = (id) => {
  cookies.set("LOGIN_ID", id);
}

export const setLoginName = (name) => {
  cookies.set("LOGIN_NAME", name);
}

export const checkLogin = () => {
  if(!cookies.get("LOGIN_ID"))
    window.location.replace("/BOBO/#/");
}

export function logout() {   
  document.cookie = "LOGIN_ID"+'=; Max-Age=-99999999;';  
  document.cookie = "LOGIN_NAME"+'=; Max-Age=-99999999;';  
}