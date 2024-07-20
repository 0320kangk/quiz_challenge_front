<template>
  <div
    v-if="characterSelectionIsOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <!-- 모달 컨테이너 -->
    <div class="bg-white rounded-lg p-8">
      <!-- 모달 헤더 -->
      <div class="mb-6 pb-2 border-b-2">
        <h2 class="text-lg font-semibold">캐릭터 선택 창</h2>
      </div>
      <!-- 모달 본문 -->
      <div class="mb-6">
        <div class="flex justify-center">
          <div v-for="(characterImg, i) in characterImgs" :key="i" class="mr-3">
            <img class="w-20 h-15 cursor-pointer" :src="characterImg.imgPath" />
          </div>
        </div>
      </div>
      <!-- 닫기 버튼 -->
      <div class="flex">
        <button
          class="px-4 py-2 w-1/2 mr-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg"
        >
          선택
        </button>
        <button
          class="px-4 py-2 w-1/2 ml-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
        >
          취소
        </button>
      </div>
    </div>
  </div>
  <nav class="bg-white-100">
    <div class="layout-default">
      <div class="flex justify-between">
        <div class="flex space-x-4">
          <div>
            <router-link
              to="/"
              class="flex items-center py-5 px-2 text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-10 w-10 mr-2 text-blue-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                />
              </svg>

              <span class="font-bold font-mono italic text-2xl"
                >QuizChallenge</span
              >
            </router-link>
          </div>
          <div class="hidden md:flex items-center space-x-1">
            <a
              href="#"
              class="font-bold py-5 px-3 text-gray-700 hover:text-gray-900"
            >
              게임소개
            </a>
            <button
              @click="changeCharacterSelectionIsOpen"
              class="font-bold py-5 px-3 text-gray-700 hover:text-gray-900"
            >
              캐릭터 선택
            </button>
          </div>
        </div>
        <div class="font-bold hidden md:flex items-center space-x-1">
          <router-link
            v-if="getMember() === null || getMember() === ''"
            to="/login"
            class="py-2 px-3 hover:bg-gray-300 rounded transition duration-300"
          >
            로그인
          </router-link>
          <div
            v-else
            class="py-2 px-3 hover:bg-gray-300 rounded transition duration-300"
          >
            {{ getMember().name }}
          </div>
          <router-link
            v-if="getMember() === null || getMember() === ''"
            to="/join"
            class="font-bold py-2 px-3 hover:bg-gray-300 rounded transition duration-300"
          >
            회원가입
          </router-link>
          <router-link
            v-else
            to="/"
            @click="logout"
            class="font-bold py-2 px-3 hover:bg-gray-300 rounded transition duration-300"
          >
            로그아웃
          </router-link>
        </div>
        <div
          @click="change_menu_toggle_state"
          class="md:hidden flex items-center"
        >
          <button v-if="!menu_toggle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <button v-else>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div :class="['md:hidden', { hidden: !menu_toggle }]">
      <router-link
        v-if="getMember() === null || getMember() === ''"
        to="/login"
        class="font-bold block py-2 px-4 text-sm hover:bg-gray-200"
      >
        로그인
      </router-link>
      <div v-else class="font-bold block py-2 px-4 text-sm hover:bg-gray-200">
        {{ getMember().name }}
      </div>
      <router-link
        v-if="getMember() === null || getMember() === ''"
        to="/join"
        class="font-bold block py-2 px-4 text-sm hover:bg-gray-200"
      >
        회원가입
      </router-link>
      <router-link
        v-else
        to="/"
        @click="logout"
        class="font-bold block py-2 px-4 text-sm hover:bg-gray-200"
      >
        로그아웃
      </router-link>

      <a
        href="#"
        @click="changeCharacterSelectionIsOpen"
        class="font-bold block py-2 px-4 text-sm hover:bg-gray-200"
      >
        캐릭터 선택
      </a>
      <a
        href="#"
        @click="change_menu_toggle_state"
        class="font-bold block py-2 px-4 text-sm hover:bg-gray-200"
      >
        게임소개
      </a>
    </div>
  </nav>
</template>
<script>
import axios from "axios";

export default {
  name: "vue_header",

  data() {
    return {
      menu_toggle: false,
      characterSelectionIsOpen: false,
      characterImgs: [],
    };
  },

  methods: {
    getMember() {
      return this.$store.getters.getMember;
    },
    checkAuth() {
      this.$store.dispatch("checkAuth");
    },
    logout() {
      this.$store.dispatch("logout");
    },
    change_menu_toggle_state() {
      this.menu_toggle = !this.menu_toggle;
    },
    changeCharacterSelectionIsOpen() {
      this.fetchCharacterImgs();
      this.characterSelectionIsOpen = !this.characterSelectionIsOpen;
    },
    async fetchCharacterImgs() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_BACKEND_ORIGIN}/api/characterImg/all`
        );
        this.characterImgs = response.data;
        for (var i = 0; i < this.characterImgs.length; i++) {
          this.characterImgs[
            i
          ].imgPath = `${process.env.VUE_APP_BACKEND_ORIGIN}/api/characterImg/${this.characterImgs[i].name}`;
        }
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching character images:", error);
      }
    },
  },
};
</script>
