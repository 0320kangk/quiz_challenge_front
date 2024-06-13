import { createStore } from "vuex";
import auth from "./auth";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";

const store = createStore({
  modules: {
    auth,
  },
  plugins: [createPersistedState()],
});

axios.interceptors.request.use(
  (config) => {
    // 요청 URL이 /api/auth/refresh인 경우 refreshToken을 사용
    const accessToken = store.getters.getAccessToken;
    if (
      config.url === `${process.env.VUE_APP_BACKEND_ORIGIN}/api/auth/refresh`
    ) {
      const refreshToken = store.getters.getRefreshToken;
      console.log("refreshToken : " + refreshToken);
      config.headers.Authorization = `Bearer ${refreshToken}`;
    } else if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Axios 응답 인터셉터 설정
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // 초기 설정: 재시도 여부와 재시도 횟수를 설정
    console.log(originalRequest._retry);
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await store.dispatch("refreshToken");
        return axios(originalRequest);
        // return Promise.resolve();
      } catch (e) {
        store.dispatch("logout");

        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

export default store;
