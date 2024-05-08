<template>
  <!-- <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                class="px-6 py-4 bg-blue-200 text-left rounded-tl-lg text-xl leading-4 font-bold text-gray-500 uppercase tracking-wider"
              >
                카테고리
              </th>
              <th
                class="px-6 py-3 bg-blue-200 text-left text-xl leading-4 font-bold text-gray-500 uppercase tracking-wider"
              >
                상태
              </th>
              <th
                class="px-6 py-3 bg-blue-200 text-left text-xl leading-4 font-bold text-gray-500 uppercase tracking-wider"
              >
                방 제목
              </th>
              <th
                class="px-6 py-3 bg-blue-200 text-left text-xl rounded-tr-lg leading-4 font-bold text-gray-500 uppercase tracking-wider"
              >
                인원
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(item, index) in tableData"
              :key="index"
              class="hover:bg-gray-300"
            >
              <td class="px-6 py-3">{{ item.category }}</td>
              <td class="px-6 py-3">{{ item.status }}</td>
              <td class="px-6 py-3">{{ item.title }}</td>
              <td class="px-6 py-3">{{ item.members }}</td>
            </tr>
          </tbody>
        </table> -->

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
      <div class="col-span-12 sm:col-span-2 m-3">
        <div class="w-full p-4 bg-gray-100 rounded-3xl shadow-2xl gap-x-4">
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
      <div
        class="col-span-12 m-3 p-3 sm:col-span-9 w-full bg-gray-100 rounded-2xl"
      >
        <div class="grid grid-cols-2">
          <div
            v-for="(item, index) in room_data"
            :key="index"
            class="col-span-2 m-3 sm:col-span-1 bg-blue-200 p-4 rounded-3xl"
          >
            <div class="p-3 bg-blue-300 text-sm rounded-xl hover:bg-gray-400">
              <div
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-200 text-gray-800"
              >
                방 제목
              </div>
              <span> 크레이지 아케이드</span>
              <div class="mt-2">
                <div
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-200 text-gray-800"
                >
                  카테고리
                </div>
                <span>카테고리 이름</span>
              </div>
              <div class="mt-2 flex justify-between">
                <div>
                  <div
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-200 text-gray-800"
                  >
                    방 상태
                  </div>
                  <span> 대기</span>
                </div>

                <div>
                  <div
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-gray-800"
                  >
                    인원수
                  </div>
                  <span>1/4</span>
                </div>
              </div>
            </div>
          </div>
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
      room_data: [
        { category: "IT", status: "활성", title: "Vue.js 강의", members: 25 },
        {
          category: "디자인",
          status: "비활성",
          title: "UI/UX 디자인 토론",
          members: 12,
        },
        {
          category: "게임",
          status: "활성",
          title: "모바일 게임 개발",
          members: 8,
        },
        // 원하는 만큼 데이터를 추가할 수 있습니다.
      ],
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
