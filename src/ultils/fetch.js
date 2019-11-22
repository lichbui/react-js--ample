import axios from "axios";
import qs from "qs";
import { AUTH_INFO } from "../configs/const";
import { REFRESH_TOKEN_API } from "../configs/api";

const configRequest = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
};

const authInstance = axios.create();
let isReAuth = false;
let subscribers = [];

const getToken = () => {
  if (JSON.parse(localStorage.getItem(AUTH_INFO))) {
    const authInfo = JSON.parse(localStorage.getItem(AUTH_INFO));
    return authInfo.token;
  }
  return "";
};

const getRefreshToken = () => {
  if (JSON.parse(localStorage.getItem(AUTH_INFO))) {
    const authInfo = JSON.parse(localStorage.getItem(AUTH_INFO));
    return authInfo.refreshToken;
  }
  return "";
};

const onRrefreshed = () => {
  subscribers.map(cb => cb());
};

const reAuth = async () => {
  const refreshToken = getRefreshToken();

  const params = new URLSearchParams();
  params.append("refreshToken", refreshToken);

  return axios
    .post(REFRESH_TOKEN_API, params, configRequest)
    .then(res => {
      const { data } = res;
      localStorage.setItem(AUTH_INFO, JSON.stringify(data));
      return true;
    })
    .catch(() => false);
};

const handleReauthResult = isReauthSuccess => {
  if (!isReauthSuccess) {
    window.localStorage.removeItem(AUTH_INFO);
    window.location.href = "/";
    return;
  }
  isReAuth = false;
  onRrefreshed();
  subscribers = [];
};

const subscribeTokenRefresh = cb => {
  subscribers.push(cb);
};

authInstance.interceptors.request.use(config => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

authInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const { response } = error;
    if (response.status !== 401) {
      return Promise.reject(error);
    }

    const originalRequest = response.config;
    originalRequest.isRetry = true;
    const refreshToken = getRefreshToken();
    const requestSubscribers = new Promise(resolve => {
      subscribeTokenRefresh(() => {
        originalRequest.headers.Authorization = getToken();
        resolve(axios(originalRequest));
      });
    });

    if (refreshToken) {
      if (!isReAuth) {
        isReAuth = true;
        const isReauthSuccess = await reAuth();
        handleReauthResult(isReauthSuccess);
      }
    }
    return requestSubscribers;
  }
);

export function postAxios(url, body) {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  return new Promise((resolve, reject) => {
    axios
      .post(url, qs.stringify(body), config)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}

export const AuthRequest = {};

AuthRequest.get = (url, body = {}) => {
  const urlEncoded = body ? `${url}?${qs.stringify(body)}` : url;
  return new Promise((resolve, reject) => {
    authInstance
      .get(urlEncoded)
      .then(async response => {
        console.log("Get Auth", response);
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });
};

AuthRequest.post = (url, body = {}) => {
  return new Promise((resolve, reject) => {
    authInstance
      .post(url, qs.stringify(body), configRequest)
      .then(async response => {
        //console.log('Post Auth', response)
        resolve(response);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};
