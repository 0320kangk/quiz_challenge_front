<template>
  <div class="layout-default">
    <div class="grid grid-cols-12">
      <div v-if="!gameStarted" class="col-span-12">
        <!-- 게임 시작  -->
        <div
          v-if="!gameStarted"
          class="flex items-center justify-center h-screen"
        >
          <div class="text-center">
            <h1 class="text-4xl font-bold mb-4">환영합니다!</h1>
            <p class="text-lg mb-8">
              게임을 시작하려면 아래의 버튼을 클릭하세요.
            </p>
            <button
              @click="startGame"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
            >
              게임 시작
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="gameStarted"
        class="col-span-12 sm:col-span-9 border border-red-600"
      >
        <!-- 게임 문제  -->
        <div v-if="currentQuizIndex < quizQuestions.length">
          <div
            class="ml-10 mr-5 mt-7 p-3 pb-10 bg-gray-200 rounded-xl font-bold shadow-xl"
          >
            <span class="text-3xl">Q.</span>
            {{ quizQuestions[currentQuizIndex].question }}
          </div>
          <div v-if="isChoice5Quiz()">
            <div
              v-for="(option, i) in quizQuestions[currentQuizIndex].options"
              :key="i"
              @click="changeselectedAnswerIndex(i)"
              :id="'answer_' + currentQuizIndex + '_' + i"
              :class="{
                'bg-yellow-200': selectedAnswerIndex === i,
                'bg-gray-200': selectedAnswerIndex !== i,
              }"
              class="ml-10 mr-5 my-10 p-5 cursor-pointer bg-gray-200 rounded-xl font-bold shadow-xl"
            >
              {{ i + 1 }}. {{ option }}
            </div>
          </div>

          <!-- OX 퀴즈 문제 형식 -->
          <div v-else class="ml-10 mr-5 mt-7 p-3 pb-10 grid grid-cols-3 gap-4">
            <div class="p-4 flex items-center justify-center">
              <p
                @click="changeselectedAnswerIndex(0)"
                :class="{ 'text-yellow-300': selectedAnswerIndex === 0 }"
                class="text-9xl cursor-pointer"
              >
                O
              </p>
            </div>
            <div class="p-4 flex items-center justify-center">
              <p class="text-9xl">/</p>
            </div>
            <div class="p-4">
              <p
                @click="changeselectedAnswerIndex(1)"
                :class="{ 'text-yellow-300': selectedAnswerIndex === 1 }"
                class="text-9xl cursor-pointer"
              >
                X
              </p>
            </div>
          </div>

          <div class="flex justify-between">
            <div class="text-xl ml-10 text-black font-bold px-5">
              {{ timer }}
            </div>
            <div
              class="mr-5 cursor-pointer text-white font-bold bg-blue-500 hover:bg-blue-700 px-10 py-4 rounded-xl"
              @click="nextQuestion"
            >
              다음 문제
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="gameStarted"
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
            totalScore: 90
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

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader {
  animation: spin 1s linear infinite;
  border: 6px solid transparent;
  border-top: 6px solid #3490dc; /* 파란색 부분 */
  border-right: 6px solid #3490dc; /* 파란색 부분 */
  border-bottom: 6px solid rgba(244, 238, 238, 0.5); /* 파란색 부분 */
  border-left: 6px solid rgba(244, 238, 238, 0.5); /* 투명 부분 */
  border-radius: 50%;
  width: 96px; /* 너비 */
  height: 96px; /* 높이 */
}
</style>
<script>
export default {
  name: "testVue",
  data() {
    return {
      //문제 항목 클릭 여부
      messages: [], // 채팅 메시지를 저장할 배열
      newMessage: "", // 입력된 새로운 메시지
      gameStarted: false,
      quizQuestions: [
        {
          question: "스프링에서 트랜잭션 관리를 위한 어노테이션은 무엇인가?",
          options: ["Transactional", "Controller", "Service", "Repository"],
          answer: "0",
          quizType: "CHOICE_5",
        },
        {
          question:
            "Spring Boot에서 내장 서버로 사용되는 서블릿 컨테이너는 무엇인가요?",
          options: ["Tomcat", "Jetty", "Undertow", "WebLogic", "WildFly"],
          answer: "0",
          quizType: "CHOICE_5",
        },
        {
          question: "Spring Bean은 Singleton으로 기본 설정되어 있는가?",
          options: ["O", "X"],
          answer: "O",
          quizType: "OX",
        },
        // 다른 퀴즈 추가
      ],
      currentQuizIndex: 0,
      selectedAnswerIndex: null,
      totalScore: 0,
      score: 33,
      timer: 0,
      intervalId: null,
    };
  },

  methods: {
    startGame() {
      this.gameStarted = true;
      console.log("게임이 시작됩니다!");
      this.startTimer();
    },
    nextQuestion() {
      if (this.selectedAnswerIndex !== null) {
        console.log(
          "정답: " + this.quizQuestions[this.currentQuizIndex].answer
        );
        this.totalScore = this.addScore(
          this.totalScore,
          this.selectedAnswerIndex
        );
        this.selectedAnswerIndex = null;

        console.log("점수: " + this.totalScore);
      }
      //다음문제로 넘어가기
      if (this.currentQuizIndex < this.quizQuestions.length) {
        this.currentQuizIndex++;
        this.startTimer();
      }
      if (this.currentQuizIndex == this.quizQuestions.length) {
        //게임 종료 후
        if (this.intervalId) {
          clearInterval(this.intervalId);
        }
        console.log(this.score);
        console.log(this.totalScore / this.score);
      }
    },
    addScore(totalScore, selectedAnswer) {
      if (
        this.quizQuestions[this.currentQuizIndex].quizType ===
        this.$store.getters.getOX
      ) {
        selectedAnswer = this.$store.getters.getOXAnswer(
          this.selectedAnswerIndex
        );
        console.log(selectedAnswer);
      }
      if (this.quizQuestions[this.currentQuizIndex].answer == selectedAnswer)
        totalScore += this.score;
      return totalScore;
    },

    startTimer() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      // 초기화
      this.timer = 10;
      // 1초마다 타이머 업데이트
      this.intervalId = setInterval(() => {
        if (this.timer > 0) {
          this.timer--;
        } else {
          clearInterval(this.intervalId); // 타이머가 0이 되면 중지
          this.nextQuestion();
        }
      }, 1000);
    },

    changeselectedAnswerIndex(selectedAnswerIndex) {
      this.selectedAnswerIndex = selectedAnswerIndex;
    },
    isChoice5Quiz() {
      const quizType = this.quizQuestions[this.currentQuizIndex].quizType;
      return quizType === this.$store.getters.getChoice_5;
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
