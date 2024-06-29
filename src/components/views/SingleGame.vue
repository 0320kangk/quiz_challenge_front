<template>
  <div class="layout-default">
    <div
      v-if="!loading && !gameStarted"
      class="flex flex-col items-center justify-center h-screen"
    >
      <div class="loader rounded-full w-24 h-24 mb-4"></div>
      <span class="text-gray-700 font-bold">Loading...</span>
    </div>
    <div class="grid grid-cols-12">
      <div v-if="!gameStarted" class="col-span-12">
        <!-- 게임 시작  -->
        <div
          v-if="loading && !gameStarted"
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
        <div class="sm:h-full" v-if="currentQuizIndex < quizQuestions.length">
          <div
            class="ml-10 mr-5 mt-7 p-3 pb-10 bg-gray-200 rounded-xl font-bold shadow-xl"
          >
            <span class="text-3xl">Q.</span>
            {{ quizQuestions[currentQuizIndex].question }}
          </div>
          <div v-if="isChoice4Quiz()">
            <div
              v-for="(option, i) in quizQuestions[currentQuizIndex].options"
              :key="i"
              @click="changeselectedAnswerIndex(i)"
              :id="'answer_' + currentQuizIndex + '_' + i"
              :class="{
                'bg-yellow-200': selectedAnswerIndex === i,
                'bg-gray-200': selectedAnswerIndex !== i,
              }"
              class="ml-10 mr-5 my-7 p-3 cursor-pointer bg-gray-200 rounded-xl font-bold shadow-xl"
            >
              {{ i + 1 }}. {{ option }}
            </div>
          </div>

          <!-- OX 퀴즈 문제 형식 -->
          <div
            v-else
            class="sm:h-3/5 ml-10 mr-5 mt-7 p-3 pb-10 grid grid-cols-3 gap-4"
          >
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
            <div class="p-4 flex items-center justify-center">
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
            <div class="text-xl ml-10 text-red-600 font-bold px-5">
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
      ></div>
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
  name: "SingleGame",
  data() {
    return {
      //문제 항목 클릭 여부

      loading: false,
      gameStarted: false,
      quizQuestions: [],
      currentQuizIndex: 0,
      selectedAnswerIndex: null,
      totalScore: 0,
      score: 0,
      timer: 0,
      intervalId: null,
    };
  },
  async mounted() {
    // 두 비동기 함수 호출 및 결과를 기다림
    const choiceQuestionPromise = this.requestQuizQuestion(
      this.$store.getters.getChoice_4
    );
    const oxQuestionPromise = this.requestQuizQuestion(
      this.$store.getters.getOX
    );
    try {
      // 두 Promise가 모두 완료될 때까지 기다림
      const [choiceQuestion, oxQuestion] = await Promise.all([
        choiceQuestionPromise,
        oxQuestionPromise,
      ]);
      // console.log(choiceQuestion.data);
      // console.log(choiceQuestion.data.concat(oxQuestion.data));

      this.quizQuestions = this.mergeQuestions(
        choiceQuestion.data,
        oxQuestion.data
      );
      this.score = 100 / this.quizQuestions.length; // 문제 당 점수 할당
      this.shuffle(this.quizQuestions);
      console.log(this.quizQuestions);
      this.loading = true;
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  },
  methods: {
    async requestQuizQuestion(quizType) {
      try {
        if (
          !history.state.title ||
          !history.state.level ||
          !history.state.questionCount ||
          !quizType
        ) {
          throw new Error("게임 실행에 필요한 값이 없습니다.");
        }

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
        // console.log(response.data.content);
        return response;
      } catch (error) {
        alert("퀴즈 문제 생성 에러, 다시 접속해주세요.");
        this.$router.push("/");
        console.error("Error fetching quiz question:", error.message); // 에러 메시지 출력
      }
    },
    mergeQuestions(choiceQuestions, oxQuestions) {
      return choiceQuestions.concat(oxQuestions);
    },
    shuffle(questions) {
      for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
      }
    },
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
    isChoice4Quiz() {
      const quizType = this.quizQuestions[this.currentQuizIndex].quizType;
      console.log(quizType === this.$store.getters.getChoice_4);
      console.log(quizType);
      console.log(this.$store.getters.getChoice_4);
      return quizType === this.$store.getters.getChoice_4;
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
