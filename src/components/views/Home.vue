<template>
  <img class="h-64 w-full" src="../../assets/quiz.png" alt="quiz image" />
  <div class="max-w-6xl mx-auto px-4 py-4 my-7">
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
      <a
        class="btn text-4xl flex-shrink-0 w-full sm:w-auto mb-4 sm:mb-0 inline-block bg-blue-500 hover:bg-blue-700 text-white"
      >
        🎮 싱글 플레이
      </a>
      <a
        class="btn text-4xl flex-shrink-0 w-full sm:w-auto inline-block bg-green-500 hover:bg-green-700 text-white"
      >
        ⚔ 멀티 플레이
      </a>
    </div>
    <!-- ... -->
  </div>
</template>

<style>
.btn {
  @apply font-bold my-5 text-center  py-24 sm:px-32 rounded-3xl shadow-2xl;
}
</style>
<script>
export default {
  name: "vue_home",
};
</script>
