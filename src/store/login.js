// store/index.js
import { createStore } from "vuex";
import axios from "axios"; // Axios import 추가
import createPersistedState from "vuex-persistedstate";
// Axios 요청 인터셉터 설정
axios.interceptors.request.use(
  (config) => {
    const token = store.getters.getAccessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await store.dispatch("refreshToken");
        return axios(originalRequest);
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
  },
  getters: {
    getAccessToken(state) {
      return state.accessToken;
    },
    getMember(state) {
      return state.member;
    },
  },
  plugins: [createPersistedState()],
});
export default store;
