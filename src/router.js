import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/views/Home.vue";
import Login from "./components/views/Login.vue";
import join from "./components/views/Join.vue";
import Single_game from "./components/views/Single_game.vue";
import Multi_game from "./components/views/Multi_game.vue";
import Game_rooms from "./components/views/Game_rooms.vue";
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
      await store.dispatch("checkAuth"); // Vuex 스토어에서 로그인 상태 확인
      next(); // 인증이 되었으면 다음 단계로 진행
    } catch (error) {
      alert("로그인이 필요합니다.");
      next("/login"); // 로그인 페이지로 리디렉션
    }
  } else {
    next(); // 인증이 필요하지 않은 경우 그냥 진행
  }
});
export default router;
