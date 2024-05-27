// store/index.js
import { createStore } from "vuex";
import axios from "axios"; // Axios import 추가
import createPersistedState from "vuex-persistedstate";

export default createStore({
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
