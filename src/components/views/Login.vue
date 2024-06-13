<template>
  <div
    class="flex items-center justify-center bg-gray-50 py-16 px-4 sm:px-6 lg:px-8"
  >
    <div
      class="max-w-md w-full space-y-8 border-4 p-10 border-gray-600 rounded-2xl"
    >
      <div>
        <h2 class="mt-6 text-center text-3xl font-bold font-mono italic">
          QuizChallenge
        </h2>
      </div>
      <form
        class="mt-8 space-y-6"
        action="#"
        method="POST"
        @submit.prevent="login"
      >
        <div class="rounded-md shadow-sm -space-y-px">
          <div
            class="bg-gray-100 p-5 rounded text-red-500 text-sm mb-3"
            v-if="errorMessage"
          >
            {{ errorMessage }}
          </div>
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              v-model="email"
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="✉ 이메일을 입력하세요."
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="🔓 비밀번호를 입력하세요."
            />
          </div>
        </div>

        <div class="flex items-center justify-end">
          <div class="text-sm">
            <a
              href="#"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              비밀번호 찾기
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!-- Heroicon name: solid/lock-closed -->
            </span>
            로그인
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "vue_login",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    login() {
      // Vuex 스토어의 login 액션 호출
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$store.dispatch("fetchMember").then(() => {
            router.push("/");
          });
          // 로그인 성공 후 추가 작업 수행
        })
        .catch((error) => {
          // 로그인 실패 시 에러 처리
          this.errorMessage = "아이디 또는 비밀번호가 잘못되었습니다.";
          console.error("Failed to login", error);
        });
    },
  },
};
</script>
