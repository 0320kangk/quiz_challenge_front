import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";
import "./index.css";
import axios from "axios";
import store from "./store"; // Vuex 스토어 임포트

const app = createApp(App);

app.config.globalProperties.$axios = axios;
// app.config.globalProperties.$backend_origin = "http://localhost:8080";

app.use(router).use(store).mount("#app");

// if (store.state.token !== null) {
//   axios.defaults.headers.common["Authorization"] =
//     "Bearer " + this.$store.state.token;
// }

// axios.interceptors.request.use(
//   (config) => {
//     const token = store.getters.getToken; // getters를 사용하여 토큰 가져오기

//     if (token !== null) {
//       config.headers["Authorization"] = "Bearer " + store.state.accessToken;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
