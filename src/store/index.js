// store/index.js
import { createStore } from "vuex";
import axios from "axios"; // Axios import 추가

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
        .post(`${process.env.VUE_APP_BACKEND_ORIGIN}/api/auth/login`, {
          email,
          password,
        })
        .then((response) => {
          if (response.data.token) {
            commit("setToken", response.data.token);
            localStorage.setItem("member", JSON.stringify(response.data));
          }
          return response.data;
        });
    },
    fetchMember({ commit, state }) {
      if (state.token) {
        return axios
          .get(`${process.env.VUE_APP_BACKEND_ORIGIN}/api/member`, {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          })
          .then((response) => {
            commit("setMember", response.data);
          })
          .catch((error) => {
            console.error("Failed to fetch member", error);
          });
      }
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
  },
});
