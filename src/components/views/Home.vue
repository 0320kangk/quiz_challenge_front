<template>
  <img class="h-64 w-full" src="../../assets/quiz.png" alt="quiz image" />
  <div class="layout-default py-4 my-7">
    <div class="pb-5 border-b-4 border-b-yellow-800 font-bold text-4xl">
      🕹 게임하기
    </div>
    <!-- <div class="p-3 mt-3">
      <span class="pb-1 font-bold text-2xl border-b-4 border-gray-600"
        >🎮 싱글 플레이
      </span>
    </div>
    <div class="p-3 mt-3">
      <span class="pb-1 font-bold text-2xl border-b-4 border-gray-600"
        >⚔ 멀티 플레이</span
      >
    </div> -->

    <div class="flex justify-between flex-wrap">
      <router-link
        to="/single_game"
        class="btn flex-shrink-0 w-full sm:w-auto mb-4 sm:mb-0 inline-block bg-blue-500 hover:bg-blue-700 text-white"
      >
        <span class="text-9xl">🎮</span>
        <div class="mt-6 text-4xl">싱글 플레이</div>
      </router-link>
      <router-link
        to="/game_rooms"
        class="btn text-4xl flex-shrink-0 w-full sm:w-auto inline-block bg-green-500 hover:bg-green-700 text-white"
      >
        <span class="text-9xl">⚔</span>
        <div class="mt-6 text-4xl">멀티 플레이</div>
      </router-link>
    </div>
    <!-- ... -->
  </div>
</template>

<style>
.btn {
  @apply font-bold my-5 text-center  py-20 sm:px-32 rounded-3xl shadow-2xl;
}
</style>
<script>
export default {
  name: "vue_home",
  mounted() {
    // console.log(this.$store.state.token + "asas");
    this.$axios
      .get(`${process.env.VUE_APP_BACKEND_ORIGIN}/api/member`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log("실패");
        console.log(error);
      });
  },
  methods: {},
  // mounted() {
  //   // Spring Boot 백엔드에서 데이터를 요청하는 GET 요청 예시
  //   this.$axios
  //     .get("http://localhost:8080/api/test", {
  //       auth: {
  //         username: "user",
  //         password: "f200f1e2-17ca-4651-803a-5ac634ff3882s00pers3cret",
  //       },
  //     })
  //     .then((response) => {
  //       // 요청이 성공했을 때 처리할 로직
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       // 요청이 실패했을 때 처리할 로직
  //       console.log("실패");
  //       console.error("Error fetching data:", error);
  //     });
  // },
};
</script>
