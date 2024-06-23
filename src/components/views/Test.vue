<template>
  <div class="flex items-center justify-center h-screen">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">환영합니다!</h1>
      <p class="text-lg mb-8">게임을 시작하려면 아래의 버튼을 클릭하세요.</p>
      <button
        @click="startGame"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
      >
        게임 시작
      </button>
    </div>
  </div>
</template>

<style scoped></style>
<script>
export default {
  name: "TestVue",
  methods: {
    startGame() {
      // 게임 시작 버튼 클릭 시 호출되는 메서드
      // 예를 들어, 게임 시작 로직을 구현하거나 다음 화면으로 네비게이션하는 등의 작업을 수행할 수 있습니다.
      // 여기서는 간단히 console.log로 메시지를 출력하도록 했습니다.
      console.log("게임이 시작됩니다!");
    },
  },
};
</script>
