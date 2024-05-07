import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/views/Home.vue";
import Login from "./components/views/Login.vue";
import Signup from "./components/views/Signup.vue";
import Single_game from "./components/views/Single_game.vue";
import Multi_game from "./components/views/Multi_game.vue";
import Game_rooms from "./components/views/Game_rooms.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/signup",
      component: Signup,
    },
    {
      path: "/single_game",
      component: Single_game,
    },
    {
      path: "/multi_game",
      component: Multi_game,
    },
    {
      path: "/game_rooms",
      component: Game_rooms,
    },
  ],
});
export default router;
