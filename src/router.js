import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/views/Home.vue";
import Login from "./components/views/Login.vue";
import join from "./components/views/join.vue";
import Single_game from "./components/views/single_game.vue";
import Multi_game from "./components/views/multi_game.vue";
import Game_rooms from "./components/views/game_rooms.vue";
import store from "./store"; // Vuex 스토어 import

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
      meta: { requiresAuth: true },
    },
    {
      path: "/multi_game",
      component: Multi_game,
      meta: { requiresAuth: true },
    },
    {
      path: "/game_rooms",
      component: Game_rooms,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    try {
      store.dispatch("logout").then(() => {
        next();
      });
    } catch (error) {
      alert("로그인이 필요합니다.");
      next("/login"); // 로그인 페이지로 리디렉션
    }
  } else {
    next();
  }
});

export default router;
