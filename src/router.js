import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/views/home.vue";
import Login from "./components/views/login.vue";
import join from "./components/views/join.vue";
import Single_game from "./components/views/single_game.vue";
import Multi_game from "./components/views/multi_game.vue";
import Game_rooms from "./components/views/game_rooms.vue";

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
      path: "/join",
      component: join,
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
