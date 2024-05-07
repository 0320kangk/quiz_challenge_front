<template>
  <div>
    <!-- 배경 오버레이 -->
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <!-- 모달 컨테이너 -->
      <div class="bg-white rounded-lg p-8 w-2/5">
        <!-- 모달 헤더 -->
        <div class="mb-6 pb-2 border-b-2">
          <h2 class="text-lg font-semibold">방 만들기</h2>
        </div>
        <!-- 모달 본문 -->
        <div class="mb-6">
          <form>
            <div class="flex items-center">
              <label for="title" class="w-1/5">방 제목 </label>
              <input
                id="title"
                class="p-2 w-4/5 text-sm border border-gray-500 rounded-lg focus:outline-gray-700"
                placeholder="방 제목을 입력하세요."
              />
            </div>
            <div class="flex items-center mt-5">
              <label for="category" class="w-1/5">카테고리 </label>
              <select
                id="category"
                class="p-2 w-4/5 text-sm border border-gray-500 rounded-lg focus:outline-gray-700"
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
            <div class="flex items-center mt-5">
              <label for="category" class="w-1/5">문제 개수</label>
              <select
                id="category"
                class="p-2 w-4/5 text-sm border border-gray-500 rounded-lg focus:outline-gray-700"
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
          </form>
        </div>
        <!-- 닫기 버튼 -->
        <div class="flex">
          <button
            @click="closeModal"
            class="px-4 py-2 w-1/2 mr-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg"
          >
            방 만들기
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
  </div>
  <div class="layout-default">
    <div class="grid grid-cols-12">
      <div class="col-span-2">
        <div class="w-full p-4 bg-gray-100 rounded-3xl shadow-2xl">
          <div
            class="p-3 my-5 font-semibold bg-yellow-400 hover:bg-yellow-400 rounded-xl"
          >
            All
          </div>
          <div class="p-3 my-5 hover:bg-yellow-400 rounded-xl">All</div>

          <div class="p-3 my-5 hover:bg-yellow-400 rounded-xl">All</div>

          <div class="p-3 my-5 hover:bg-yellow-400 rounded-xl">All</div>
          <div class="p-3 my-5 hover:bg-yellow-400 rounded-xl">All</div>

          <div class="p-3 my-5 hover:bg-yellow-400 rounded-xl">All</div>
        </div>
        <div class="text-center mt-4">
          <button
            @click="openModal"
            class="p-3 w-full font-semibold text-white bg-yellow-400 rounded-3xl shadow-2xl"
          >
            방 만들기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "game_rooms_vue",

  data() {
    return {
      isOpen: false, // 모달이 열려있는지 여부
    };
  },
  methods: {
    openModal() {
      this.isOpen = true; // 모달 열기
    },
    closeModal() {
      this.isOpen = false; // 모달 닫기
    },
  },
};
</script>
