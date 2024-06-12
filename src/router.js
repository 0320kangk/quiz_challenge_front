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
      this.$store.dispatch("checkAuth"); // 인증 실패 시 토큰 제거
      next();
    } catch (error) {
      next("/login"); // 로그인 페이지로 리디렉션
    }
  } else {
    next();
  }
});

export default router;
