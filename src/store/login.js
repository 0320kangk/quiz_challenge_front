// store/index.js
import { createStore } from "vuex";
import axios from "axios"; // Axios import 추가
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    token: null,
    member: null,
  },

  mutations: {
    setToken(state, token) {
      state.token = token;
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
          if (response.data.token) {
            console.log("setToken");
            commit("setToken", response.data.token);
            // localStorage.setItem("member", JSON.stringify(response.data));
          }
          return response.data;
        });
    },
    logout({ commit }) {
      commit("setMember", null);
      commit("setToken", null);
    },
    fetchMember({ commit, state }) {
      if (state.token) {
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
    getToken(state) {
      return state.token;
    },
    getMember(state) {
      return state.member;
    },
  },
  plugins: [createPersistedState()],
});
