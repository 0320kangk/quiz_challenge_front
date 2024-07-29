import { createStore } from "vuex";
import auth from "./auth";
import quiz from "./quiz";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import router from '../router';

const store = createStore({
  modules: {
    auth,
    quiz,
  },
  plugins: [
    createPersistedState({
      paths: ['auth'], // auth 모듈만 persist 적용
    }),
  ],
});

axios.interceptors.request.use(
  (config) => {
    // 요청 URL이 /api/auth/refresh인 경우 refreshToken을 사용
    const accessToken = store.getters.getAccessToken;
    if (
      config.url === `${process.env.VUE_APP_BACKEND_ORIGIN}/auth/refresh`
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
  // 500 에러 처리

    router.push({
      name: 'error',
      query: {
        errorCode: error.response.status,
        errorMessage: error.message,
      },
    });
    return Promise.reject(error);
  }
);

export default store;
