import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";
import "./index.css";
import axios from "axios";
import store from "./store/login";

const app = createApp(App);

app.config.globalProperties.$axios = axios;
// app.config.globalProperties.$backend_origin = "http://localhost:8080";

const member = JSON.parse(localStorage.getItem("member"));
if (member && member.token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + member.token;
}
app.use(router).use(store).mount("#app");
