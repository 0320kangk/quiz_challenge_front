<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <!-- 모달 컨테이너 -->
    <div class="bg-white rounded-lg p-8 w-96">
      <!-- 모달 헤더 -->
      <div class="mb-6 pb-2 border-b-2">
        <h2 class="text-lg font-semibold">게임 설정</h2>
      </div>
      <!-- 모달 본문 -->
      <div class="mb-6">
        <form>
          <div class="flex items-center mt-5">
            <label for="theme" class="w-1/5">주제 </label>
            <select
              v-model="singleGameData.theme"
              id="theme"
              class="p-2 w-4/5 text-sm border border-gray-500 rounded-lg focus:outline-gray-700"
            >
              <option hidden disabled value="">제목을 선택하세요.</option>

              <option value="Spring framework">Spring framework</option>
              <option value="Java">Java</option>
            </select>
          </div>
          <div class="flex items-center mt-5">
            <label for="questionCount" class="w-1/5">문제 수</label>
            <select
              v-model="singleGameData.questionCount"
              id="questionCount"
              class="p-2 w-4/5 text-sm border border-gray-500 rounded-lg focus:outline-gray-700"
            >
              <option disabled hidden value="">문제 수를 선택하세요.</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
          <div class="flex items-center mt-5">
            <label for="level" class="w-1/5">난이도</label>
            <select
              v-model="singleGameData.level"
              id="level"
              class="p-2 w-4/5 text-sm border border-gray-500 rounded-lg focus:outline-gray-700"
            >
              <option disabled hidden value="">난이도 선택</option>
              <option value="EASY">쉬움</option>
              <option value="NORMAL">보통</option>
              <option value="HARD">어려움</option>
            </select>
          </div>
        </form>
      </div>
      <!-- 닫기 버튼 -->
      <div class="flex">
        <button
          @click="singleGamePlay"
          class="px-4 py-2 w-1/2 mr-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg"
        >
          게임 플레이
        </button>
        <button
          @click="closeModal"
          class="px-4 py-2 w-1/2 ml-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
        >
          취소
        </button>
      </div>
    </div>
  </div>
  <img
    class="layout-default h-64 w-full"
    src="../../assets/quiz4.png"
    alt="quiz image"
  />
  <div class="layout-default py-2 my-7">
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
        class="btn flex-shrink-0 w-full sm:w-auto mb-4 sm:mb-0 inline-block bg-indigo-400 hover:bg-indigo-500 text-white"
      >
        <span class="text-9xl">🎮</span>
        <div class="mt-6 text-4xl">싱글 플레이</div>
      </button>

      <router-link
        to="/gameRooms"
        class="btn text-4xl flex-shrink-0 w-full sm:w-auto inline-block bg-amber-800 hover:bg-amber-900 text-white"
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
  name: "HomeVue",
  data() {
    return {
      isOpen: false,
      singleGameData: {
        theme: "",
        questionCount: "",
        level: "",
      },
    }; // 모달이 열려있는지 여부
  },
  methods: {
    singleGameOpenModal() {
      this.isOpen = true; // 모달 열기
      this.singleGameData.theme = "";
      this.singleGameData.questionCount = "";
      this.singleGameData.level = "";
    },
    singleGamePlay() {
      if (
        this.singleGameData.theme !== "" &&
        this.singleGameData.questionCount !== "" &&
        this.singleGameData.level !== ""
      ) {
        this.singleGameData.questionCount = parseInt(
          this.singleGameData.questionCount
        );
        this.$router.push({
          path: "/singleGame",
          state: this.singleGameData,
        });
      } else {
        alert("빈 값은 허용되지 않습니다.");
      }
    },
    openModal() {
      this.isOpen = true; // 모달 열기
      this.singleGameData.theme = "";
      this.singleGameData.questionCount = "";
    },
    closeModal() {
      this.isOpen = false; // 모달 닫기
    },
  },
};
</script>
