<template>
  <div
    class="flex items-center justify-center bg-gray-50 py-16 px-4 sm:px-6 lg:px-8"
  >
    <div
      class="max-w-md w-full space-y-8 border-4 p-10 border-gray-600 rounded-2xl"
    >
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          회원가입
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="member-name" class="sr-only">회원 이름</label>
            <input
              id="member-name"
              name="member_name"
              type="text"
              v-model="member_name"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="🎫 회원 이름"
            />
          </div>
          <div>
            <label for="email-address" class="sr-only">이메일 주소</label>
            <input
              id="email-address"
              name="email"
              type="email"
              v-model="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-4"
              placeholder="✉ 이메일 주소"
            />
          </div>
          <div>
            <label for="password" class="sr-only">비밀번호</label>
            <input
              id="password_origin"
              name="password"
              type="password"
              autocomplete="current-password"
              v-model="password_origin"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-4"
              placeholder="🔓 비밀번호"
            />
          </div>
          <div>
            <label for="password" class="sr-only">비밀번호 확인</label>
            <input
              id="password_check"
              name="passwordCheck"
              type="password"
              v-model="password_check"
              autocomplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-4"
              placeholder="🔓 비밀번호 확인"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="remember_me" class="ml-2 block text-sm text-gray-900">
              회원가입 정보를 기억하기
            </label>
          </div>

          <div class="text-sm">
            <a
              href="#"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              회원가입
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "vue_signup",
  data() {
    return {
      member_name: "",
      email: "",
      password_origin: "",
      password_check: "",
    };
  },
  methods: {
    handleSubmit() {
      if (this.password_origin !== this.password_check) {
        this.passwordMismatch = true;
        alert("비밀빈호가 다릅니다.");
      } else {
        // 비밀번호가 일치할 때의 로직을 작성합니다.
        this.passwordMismatch = false;
        // 여기서 submit을 처리합니다.
        this.$axios
          .post(`${process.env.VUE_APP_BACKEND_ORIGIN}/api/join`, {
            name: this.member_name,
            email: this.email,
            passwordOrigin: this.password_origin,
            passwordCheck: this.password_check,
            // 다른 필드들 추가
          })
          .then((response) => {
            // 요청이 성공했을 때 처리할 로직
            console.log(response);
            window.location.href = "/";
          })
          .catch((error) => {
            // 요청이 실패했을 때 처리할 로직
            console.log("실패");
            console.error("Error fetching data:", error);
          });
      }
    },
  },
};
</script>
