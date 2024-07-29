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

  <div>
    <h1>Character Image</h1>
    <button
      @click="fetchCharacterImage"
      class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      캐릭터 이미지 불러오기
    </button>
    <div v-if="imageUrl">
      <img :src="imageUrl" alt="Character Image" />
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "testVue2",
  data() {
    return {
      showCorrectModal: false,
      showIncorrectModal: false,
      imageUrl: null,
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
    async fetchCharacterImage() {
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_BACKEND_ORIGIN}/characterImg`,
          {
            responseType: "blob", // Ensures the response is a Blob (binary data)
          }
        );
        const url = URL.createObjectURL(response.data);
        this.imageUrl = url;
      } catch (error) {
        console.error("Failed to fetch character image", error);
      }
    },
  },
};
</script>
