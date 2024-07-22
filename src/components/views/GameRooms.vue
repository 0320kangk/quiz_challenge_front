<template>
  <div>
    <!-- 배경 오버레이 -->
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <!-- 모달 컨테이너 -->
      <div class="bg-white rounded-lg p-8 w-96">
        <!-- 모달 헤더 -->
        <div class="mb-6 pb-2 border-b-2">
          <h2 class="text-lg font-semibold">방 만들기</h2>
        </div>
        <!-- 모달 본문 -->
        <div class="mb-6">
          <form>
            <div class="flex items-center">
              <label for="roomName" class="w-1/5">방 이름 </label>
              <input
                v-model="roomFormData.roomName"
                id="roomName"
                class="p-2 w-4/5 text-sm border border-gray-500 rounded-lg focus:outline-gray-700"
                placeholder="방 이름을 입력하세요."
              />
            </div>
            <div class="flex items-center mt-5">
              <label for="title" class="w-1/5">제목</label>
              <select
                v-model="roomFormData.title"
                id="title"
                class="p-2 w-4/5 text-sm border border-gray-500 rounded-lg focus:outline-gray-700"
              >
                <option hidden disabled value="">제목을 선택하세요.</option>

                <option value="SPRINGFRAMEWORK">Spring framework</option>
                <option value="JAVA">Java</option>
              </select>
            </div>
            <div class="flex items-center mt-5">
              <label for="questionCount " class="w-1/5">문제 수</label>
              <select
                v-model="roomFormData.questionCount"
                id="questionCount"
                class="p-2 w-4/5 text-sm border border-gray-500 rounded-lg focus:outline-gray-700"
              >
                <option disabled hidden value="">문제 수를 선택하세요.</option>

                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
            <div class="flex items-center mt-5">
              <label for="quizLevel" class="w-1/5">난이도</label>
              <select
                v-model="roomFormData.quizLevel"
                id="quizLevel"
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
            @click="createGameRoom"
            class="px-4 py-2 w-1/2 mr-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg"
          >
            방 만들기
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
  </div>
  <!-- 사이드 바 -->
  <div class="layout-default">
    <div class="grid grid-cols-12">
      <div class="col-span-12 md:col-span-3 m-3 h-">
        <button
          @click="open_sidebar"
          class="md:hidden p-3 w-full font-semibold text-white bg-blue-300 rounded-3xl shadow-2xl"
        >
          카테고리 메뉴
        </button>
        <!-- md 이상에서는 무조건 sidebar가 보여야 한다. -->
        <div
          :class="[{ hidden: !sidebar }]"
          class="w-full md:block p-4 bg-gray-100 rounded-3xl shadow-2xl gap-x-4 h-144"
        >
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
          <!-- :class="['md:hidden', { hidden: !menu_toggle }]" -->
          <button
            @click="open_modal"
            class="p-3 w-full font-semibold text-white bg-yellow-400 rounded-3xl shadow-2xl"
          >
            방 만들기
          </button>
        </div>
      </div>
      <!-- 방 목록 -->
      <div
        class="col-span-12 m-3 p-3 md:col-span-9 w-full h-160 overflow-y-scroll bg-gray-100 rounded-2xl"
      >
        <div class="grid grid-cols-2">
          <div
            v-for="(room, index) in rooms"
            :key="index"
            class="col-span-2 m-3 lg:col-span-1 bg-blue-200 p-4 rounded-3xl"
          >
            <div
              @click="enterGameRoom(room.id)"
              class="p-3 bg-blue-300 text-sm rounded-xl hover:bg-gray-400 cursor-pointer"
            >
              <div
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-200 text-gray-800"
              >
                방 이름
              </div>
              <span class="ml-2"> {{ room.name }}</span>
              <div class="mt-2">
                <div
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-200 text-gray-800"
                >
                  제목
                </div>
                <span class="ml-2">{{ room.title }}</span>
              </div>
              <div class="mt-2 flex justify-between">
                <div>
                  <div
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-200 text-gray-800"
                  >
                    방 상태
                  </div>
                  <span class="ml-2"> {{ room.status }}</span>
                </div>

                <div>
                  <div
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-gray-800"
                  >
                    인원수
                  </div>
                  <span class="ml-2">{{ room.peopleCount }} / 4 </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* Custom scrollbar styles */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>

<script>
import axios from "axios";
export default {
  name: "GameRooms",

  data() {
    return {
      isOpen: false, // 모달이 열려있는지 여부
      sidebar: false,
      rooms: [],
      //원하는 만큼 데이터를 추가할 수 있습니다.
      roomFormData: {
        roomName: "",
        title: "",
        questionCount: "",
        quizLevel: "",
      },
    };
  },
  async mounted() {
    const response = await this.findGameRooms();
    this.rooms = response.data;
    console.log(this.rooms);
  },
  methods: {
    //방불러오기, 방 만들기
    async findGameRooms() {
      try {
        const response = await this.$axios.get(
          `${process.env.VUE_APP_BACKEND_ORIGIN}/api/gameRoom/all`
        );
        return response;
      } catch (e) {
        return e;
      }
    },
    async createGameRoom() {
      try {
        console.log();
        const response = await this.$axios.post(
          `${process.env.VUE_APP_BACKEND_ORIGIN}/api/gameRoom/create`,
          {
            roomName: this.roomFormData.roomName,
            questionCount: this.roomFormData.questionCount,
            title: this.roomFormData.title,
            quizLevel: this.roomFormData.quizLevel,
          }
        );
        this.enterGameRoom(response.data.roomId);
        console.log(response);
      } catch (e) {
        console.log(e);
        console.log("게임방 생성 실패");
      }
    },
    async enterGameRoom(roomId) {
      const responseData = await axios.get(
        `${process.env.VUE_APP_BACKEND_ORIGIN}/api/gameRoom/status/${roomId}`
      );
      console.log(responseData.data);
      const roomStatus = responseData.data;
      //대기 상태
      console.log("roomStatus : " + roomStatus);
      if (roomStatus === "WAITING") {
        this.$router.push(`/multiGame/room/${roomId}`);
      } else if (roomStatus === "PLAYING") {
        //게임 중
        alert("현재 방은 게임중입니다.");
      }
    },
    open_modal() {
      this.isOpen = true; // 모달 열기
      this.roomFormData.roomName = "";
      this.roomFormData.title = "";
      this.roomFormData.questionCount = "";
    },
    close_modal() {
      this.isOpen = false; // 모달 닫기
    },
    open_sidebar() {
      this.sidebar = !this.sidebar;
    },
  },
};
</script>
