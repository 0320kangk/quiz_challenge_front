<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4"
  >
    <div
      class="text-center bg-white p-6 py-10 rounded-l shadow-lg max-w-xl w-full"
    >
      <div class="grid grid-cols-2">
        <div class="col-span-1 flex flex-col items-center justify-center">
          <span class="text-8xl">😢</span>
        </div>
        <div class="col-span-1">
          <h1 class="text-6xl font-bold text-red-500">{{ errorCode }}‼</h1>
          <p class="text-xl font-semibold text-gray-700 mt-4">
            {{ errorMessage }}
          </p>
          <button
            @click="goHome"
            class="mt-6 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-200 ease-in-out transform hover:scale-105"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorPage",
  data() {
    return {
      errorCode: this.$route.query.errorCode || "404",
      errorMessage:
        this.$route.query.errorMessage || "페이지를 찾을 수 없습니다.",
    };
  },
  mounted() {
    console.log(this.$route.params.errorCode);
    console.log("testest");
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>
