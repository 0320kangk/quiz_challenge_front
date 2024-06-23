<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <!-- 모달 컨테이너 -->
    <div class="w-full bg-white rounded-lg p-8 sm:w-2/5">
      <!-- 모달 헤더 -->
      <div class="mb-6 pb-2 border-b-2">
        <h2 class="text-lg font-semibold">게임 설정</h2>
      </div>
      <!-- 모달 본문 -->
      <div class="mb-6">
        <form>
          <div class="flex items-center mt-5">
            <label for="topic" class="w-1/5">주제 </label>
            <select
              v-model="form_data.topic"
              id="topic"
              class="p-2 w-4/5 text-sm border border-gray-500 rounded-lg focus:outline-gray-700"
            >
              <option hidden disabled value="">주제를 선탁하세요.</option>

              <option value="option1">Spring framework</option>
              <option value="option2">java</option>
            </select>
          </div>
          <div class="flex items-center mt-5">
            <label for="topic " class="w-1/5">문제 수</label>
            <select
              v-model="form_data.problem_count"
              id="problem_count"
              class="p-2 w-4/5 text-sm border border-gray-500 rounded-lg focus:outline-gray-700"
            >
              <option disabled hidden value="">문제 수를 선택하세요.</option>

              <option value="option1">10</option>
              <option value="option2">20</option>
            </select>
          </div>
        </form>
      </div>
      <!-- 닫기 버튼 -->
      <div class="flex">
        <button
          @click="create_room"
          class="px-4 py-2 w-1/2 mr-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg"
        >
          게임 플레이
        </button>
        <button
          @click="close_modal"
          class="px-4 py-2 w-1/2 ml-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
        >
          취소
        </button>
      </div>
    </div>
  </div>
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
      <button
        @click="singleGameOpenModal"
        class="btn flex-shrink-0 w-full sm:w-auto mb-4 sm:mb-0 inline-block bg-blue-500 hover:bg-blue-700 text-white"
      >
        <span class="text-9xl">🎮</span>
        <div class="mt-6 text-4xl">싱글 플레이</div>
      </button>
      <button
        class="btn text-4xl flex-shrink-0 w-full sm:w-auto inline-block bg-green-500 hover:bg-green-700 text-white"
      >
        <span class="text-9xl">⚔</span>
        <div class="mt-6 text-4xl">멀티 플레이</div>
      </button>
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
  name: "HomeVue",
  data() {
    return {
      isOpen: false,
      form_data: {
        topic: "",
        problem_count: "",
      },
    }; // 모달이 열려있는지 여부
  },
  methods: {
    singleGameOpenModal() {
      this.isOpen = true; // 모달 열기
      this.form_data.topic = "";
      this.form_data.problem_count = "";
    },
    open_modal() {
      this.isOpen = true; // 모달 열기
      this.form_data.topic = "";
      this.form_data.problem_count = "";
    },
    close_modal() {
      this.isOpen = false; // 모달 닫기
    },
  },
};
</script>
