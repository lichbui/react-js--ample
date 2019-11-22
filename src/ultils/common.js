import { AUTH_INFO } from "../configs/const";

export const isLogin = () => {
  const loginData = localStorage.getItem(AUTH_INFO);
  if (loginData) {
    return true;
  }
  return false;
};
