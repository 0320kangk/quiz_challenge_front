<template>
  <div class="layout-default">
    <div class="grid grid-cols-12">
      <div class="col-span-12 sm:col-span-9 border border-red-700">
        <div
          class="ml-10 mt-7 p-3 pb-10 bg-gray-200 rounded-xl font-bold shadow-xl"
        >
          <span class="text-3xl">Q.</span> 스프링에서 트랜택션 관리를 위한
          이노에션은 무엇인가?
        </div>
        <div
          v-for="i in 4"
          :key="i"
          :class="{ 'bg-yellow-200': isClicked }"
          @click="changeBgColor"
          :id="'answer_' + i"
          class="ml-10 my-10 p-5 bg-gray-200 rounded-xl font-bold shadow-xl"
        >
          스프링에서 트랜잭션 관리를 위한 이노에션은 무엇인가?
        </div>
      </div>
      <div
        class="col-span-12 sm:col-span-3 border border-red-600 flex justify-center"
      >
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
          <img
            class="w-full"
            src="../../assets/character/bear.png"
            alt="Sunset in the mountains"
          />
          <div
            class="font-bold text-lg text-center bg-gray-200 rounded-full px-3 py-1"
          >
            name: junho <br />
            score: 90
          </div>
          <div class="px-6 pt-4 pb-2">
            <div class="h-64 bg-gray-100 flex flex-col justify-between">
              <!-- 채팅창 메시지 영역 -->
              <div
                ref="messageContainer"
                class="flex-grow px-4 py-8 overflow-y-auto"
              >
                <!-- 메시지 -->
                <div
                  v-for="(message, index) in messages"
                  :key="index"
                  class="mb-4"
                >
                  <!-- 메시지 내용 -->
                  <div v-if="message.isSent" class="flex justify-end">
                    <div
                      class="max-w-xs px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                      {{ message.content }}
                    </div>
                  </div>
                  <div v-else class="flex">
                    <div
                      class="max-w-xs px-4 py-2 bg-white border border-gray-300 rounded-lg"
                    >
                      {{ message.content }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- 채팅 입력창 -->
              <div class="flex items-center bg-white border-t border-gray-300">
                <input
                  type="text"
                  v-model="newMessage"
                  @keyup.enter="sendMessage"
                  placeholder="메시지를 입력하세요..."
                  class="w-full py-2 border focus:outline-none focus:border-blue-500"
                />
                <button
                  @click="sendMessage"
                  class="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                >
                  ✉
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingleGame",
  data() {
    return {
      isClicked: false, //문제 항목 클릭 여부
      messages: [], // 채팅 메시지를 저장할 배열
      newMessage: "", // 입력된 새로운 메시지
    };
  },
  mounted() {
    const choiceQueston = this.requestQuizQuestion("CHOICE");
    const oxQuestion = this.requestQuizQuestion("OX");

    console.log(choiceQueston);
    console.log(oxQuestion);
    console.log(history.state); // 'value'
    console.log(history.state.questionCount / 2);
  },
  methods: {
    async requestQuizQuestion(quizType) {
      try {
        const response = await this.$axios.post(
          `${process.env.VUE_APP_BACKEND_ORIGIN}/api/chatGpt/chat/completion/content`,
          {
            title: history.state.title,
            quizLevel: history.state.level,
            count: history.state.questionCount / 2,
            quizType: quizType,
          },
          {
            withCredentials: true,
          }
        );
        console.log(response.data.content);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    changeBgColor(e) {
      // 색상 변경 로직
      const elements = document.querySelectorAll('[id^="answer_"]');
      elements.forEach((element) => {
        element.classList.remove("bg-yellow-200");
      });
      e.target.classList.add("bg-yellow-200");
      console.log(e.target.className);
    },
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        // 새로운 메시지를 배열에 추가
        this.messages.push({
          content: this.newMessage,
          isSent: true, // 메시지가 보낸 것인지 여부
        });
        // 입력창 초기화
        this.newMessage = "";
        this.$nextTick(() => {
          // 채팅창 요소에 접근하여 스크롤을 아래로 내림
          const messageContainer = this.$refs.messageContainer;
          messageContainer.scrollTop = messageContainer.scrollHeight;
        });
      }
    },
  },
};
</script>
