// store/index.js
import { createStore } from "vuex";
import axios from "axios"; // Axios import 추가
import createPersistedState from "vuex-persistedstate";
// Axios 요청 인터셉터 설정
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
const store = createStore({
  state: {
    accessToken: null,
    refreshToken: null,
    member: null,
  },

  mutations: {
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;
    },
    setRefreshToken(state, refreshToken) {
      state.refreshToken = refreshToken;
    },
    setMember(state, member) {
      state.member = member;
    },
  },
  actions: {
    login({ commit }, { email, password }) {
      return axios
        .post(
          `${process.env.VUE_APP_BACKEND_ORIGIN}/api/auth/login`,
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.data.accessToken) {
            console.log("setAccessToken");
            commit("setAccessToken", response.data.accessToken);
            commit("setRefreshToken", response.data.refreshToken);
            // localStorage.setItem("member", JSON.stringify(response.data));
          }
          return response.data;
        });
    },
    logout({ commit }) {
      commit("setMember", null);
      commit("setAccessToken", null);
      commit("setRefreshToken", null);
    },
    fetchMember({ commit, state }) {
      if (state.accessToken) {
        return axios
          .get(`${process.env.VUE_APP_BACKEND_ORIGIN}/api/member`, {
            withCredentials: true,
          })
          .then((response) => {
            commit("setMember", response.data);
            console.log("setMember suuccess");
          })
          .catch((error) => {
            console.error("Failed to fetch member", error);
          });
      }
    },
    async refreshToken({ commit, state }) {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_BACKEND_ORIGIN}/api/auth/refresh`,
          {
            refreshToken: state.refreshToken,
          }
        );
        commit("setAccessToken", response.data.accessToken);
        commit("setRefreshToken", response.data.refreshToken);
        return response;
      } catch (error) {
        commit("logout");
        throw error;
      }
    },
  },
  getters: {
    getAccessToken(state) {
      return state.accessToken;
    },
    getMember(state) {
      return state.member;
    },
    getRefreshToken(state) {
      return state.refreshToken;
    },
  },
  plugins: [createPersistedState()],
});
export default store;
