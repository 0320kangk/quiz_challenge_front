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
              <label for="theme" class="w-1/5">제목</label>
              <select
                v-model="roomFormData.theme"
                id="theme"
                class="p-2 w-4/5 text-sm border border-gray-500 rounded-lg focus:outline-gray-700"
              >
                <option hidden disabled value="">제목을 선택하세요.</option>
                <option
                  v-for="(theme, index) in themes"
                  :key="index"
                  :value="formattedTheme(theme)"
                >
                  {{ theme }}
                </option>

                <!-- <option value="SPRINGFRAMEWORK">Spring framework</option>
                <option value="JAVA">Java</option> -->
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
    <span class="display: inline-block text-2xl font-semibold m-3"
      >📑 게임 방 목록</span
    >
    <div class="grid grid-cols-12">
      <div class="col-span-12 md:col-span-3 m-3">
        <button
          @click="open_sidebar"
          class="md:hidden p-3 w-full font-semibold text-white bg-blue-300 rounded-3xl shadow-2xl"
        >
          카테고리 메뉴
        </button>
        <!-- md 이상에서는 무조건 sidebar가 보여야 한다. -->
        <div
          :class="[{ hidden: !sidebar }]"
          class="w-full md:block md:h-144 p-4 bg-gray-100 rounded-3xl shadow-2xl gap-x-4"
        >
          <div
            v-for="(theme, index) in sideBarThemes"
            :key="index"
            :class="[
              'p-3 my-5  rounded-xl cursor-pointer hover:bg-yellow-400 hover:font-bold',
              {
                'bg-yellow-400 font-bold': selectedThemeIndex === index,
              },
            ]"
            @click="selectedTheme(index)"
          >
            {{ theme }}
          </div>
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
        :class="[
          `col-span-12 my-3 p-3  md:col-span-9 w-full h-160 overflow-y-scroll bg-gray-100 rounded-2xl`,
          { 'flex items-center justify-center': rooms.length == 0 },
        ]"
      >
        <div
          v-if="rooms.length === 0"
          class="text-gray-400 text-2xl sm:text-4xl"
        >
          😢 현재 방이 없습니다.
        </div>
        <div class="grid grid-cols-2">
          <div
            v-for="(room, index) in filterRooms()"
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
                <span class="ml-2">{{ room.theme }}</span>
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
      themes: [],
      sideBarThemes: [],
      //원하는 만큼 데이터를 추가할 수 있습니다.
      roomFormData: {
        roomName: "",
        theme: "",
        questionCount: "",
        quizLevel: "",
      },
      selectedThemeIndex: 0,
    };
  },
  async mounted() {
    this.rooms = await this.findGameRooms();
    this.themes = await this.findAllTheme();
    this.sideBarThemes = Array.from(this.themes);
    this.sideBarThemes.unshift("ALL");
    console.log(this.rooms);
  },
  methods: {
    async findAllTheme() {
      try {
        const response = await this.$axios.get(
          `${process.env.VUE_APP_BACKEND_ORIGIN}/quizTheme/all`
        );

        return response.data;
      } catch (e) {
        alert("퀴즈 테마 가져오기 실패");
        return e;
      }
    },
    //방불러오기, 방 만들기
    async findGameRooms() {
      try {
        const response = await this.$axios.get(
          `${process.env.VUE_APP_BACKEND_ORIGIN}/gameRoom/all`
        );
        console.log("방 가져오기 ");
        console.log(response.data);
        return response.data;
      } catch (e) {
        alert("방 목록 가져오기 실패");
        return e;
      }
    },
    async createGameRoom() {
      try {
        console.log();
        const response = await this.$axios.post(
          `${process.env.VUE_APP_BACKEND_ORIGIN}/gameRoom/create`,
          {
            roomName: this.roomFormData.roomName,
            questionCount: this.roomFormData.questionCount,
            theme: this.roomFormData.theme,
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
        `${process.env.VUE_APP_BACKEND_ORIGIN}/gameRoom/status/${roomId}`
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
      this.roomFormData.theme = "";
      this.roomFormData.questionCount = "";
    },
    close_modal() {
      this.isOpen = false; // 모달 닫기
    },
    open_sidebar() {
      this.sidebar = !this.sidebar;
    },
    selectedTheme(index) {
      this.selectedThemeIndex = index;
    },
    filterRooms() {
      const selectedTheme = this.themes[this.selectedThemeIndex];
      if (selectedTheme === "ALL") {
        return this.rooms;
      }
      return this.rooms.filter(
        (room) => room.theme === this.themes[this.selectedThemeIndex]
      );
    },
    formattedTheme(theme) {
      return theme.replace(/\s+/g, "").toUpperCase();
    },
  },
};
</script>
