<template>
  <div class="min-h-screen flex">
    <div class="flex-1 bg-gray-100 p-8">
      <!-- 퀴즈 내용 -->
      <div class="bg-white p-4 rounded shadow-md">
        <h1 class="text-2xl font-bold mb-4">
          Q. Spring Data JPA의 역할은 무엇입니까?
        </h1>
        <ul class="space-y-2">
          <li class="bg-gray-200 p-2 rounded">
            1. ORM(Object-Relational Mapping)을 지원
          </li>
          <li class="bg-gray-200 p-2 rounded">2. 웹 서버를 구축</li>
          <li class="bg-gray-200 p-2 rounded">3. 빌드 자동화</li>
          <li class="bg-gray-200 p-2 rounded">4. 프론트엔드 개발</li>
        </ul>
      </div>
    </div>
    <div class="w-1/4 bg-white p-4 rounded shadow-md flex flex-col">
      <!-- 유저 프로필 -->
      <div class="flex items-center mb-4">
        <img
          src="@/assets/character/bear.png"
          alt="Profile"
          class="w-16 h-16 rounded-full"
        />
        <div class="ml-4">
          <h2 class="text-xl font-bold">강준호</h2>
          <p>점수: 20</p>
        </div>
      </div>
      <!-- 채팅 -->
      <div class="flex-1 bg-blue-100 p-4 rounded overflow-auto">
        <div class="text-sm">
          <p class="mb-2">강준호님이 채팅방에 참여하였습니다.</p>
          <!-- 채팅 메시지들 -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "testVue3",
};
</script>
