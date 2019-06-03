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