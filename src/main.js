import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";
import "./index.css";
import axios from "axios";

const app = createApp(App);

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$backend_origin = "http://localhost:8080";

app.use(router).mount("#app");
