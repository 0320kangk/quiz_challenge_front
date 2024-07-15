<template>
  <div>
    <!-- Correct Answer Modal -->
    <div
      v-if="showCorrectModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-lg p-8 px-20 shadow-lg text-center">
        <p class="text-9xl text-green-500 font-bold">O</p>
        <h2 class="text-2xl mt-4 font-bold mb-4">정답입니다!</h2>
      </div>
    </div>

    <!-- Incorrect Answer Modal -->
    <div
      v-if="showIncorrectModal"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-lg p-8 px-20 shadow-lg text-center">
        <p class="text-9xl text-red-500 font-bold">X</p>

        <h2 class="text-2xl mt-4 font-bold mb-4">틀렸습니다!</h2>
      </div>
    </div>

    <!-- Test Button (For demonstration purposes) -->
    <button
      @click="showCorrect"
      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      정답 모달 테스트
    </button>
    <button
      @click="showIncorrect"
      class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      오답 모달 테스트
    </button>
  </div>
</template>
<script>
export default {
  name: "testVue2",
  data() {
    return {
      showCorrectModal: false,
      showIncorrectModal: false,
    };
  },
  methods: {
    showCorrect() {
      this.showCorrectModal = true;
    },
    showIncorrect() {
      this.showIncorrectModal = true;
    },
    closeModal() {
      this.showCorrectModal = false;
      this.showIncorrectModal = false;
    },
  },
};
</script>
