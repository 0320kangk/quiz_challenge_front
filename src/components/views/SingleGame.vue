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
      <div v-if="loading && !gameStarted && !gameEnded" class="col-span-12">
        <!-- 게임 시작  -->
        <div class="flex items-center justify-center h-screen">
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
        v-if="gameStarted && !gameEnded"
        class="col-span-12 md:col-span-9 border border-red-600"
      >
        <!-- 게임 문제  -->
        <div class="md:h-full" v-if="currentQuizIndex < quizQuestions.length">
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
              @click="changeSelectedAnswerIndex(i)"
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
            class="md:h-3/5 ml-10 mr-5 mt-7 p-3 pb-10 grid grid-cols-3 gap-4"
          >
            <div class="p-4 flex items-center justify-center">
              <p
                @click="changeSelectedAnswerIndex(0)"
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
                @click="changeSelectedAnswerIndex(1)"
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
        v-if="gameStarted && !gameEnded"
        class="col-span-12 md:col-span-3 w-full border border-red-600 flex flex-col justify-center"
      >
        <div class="max-w-full rounded overflow-hidden shadow-lg">
          <!-- 문제 결과 표 -->
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-center whitespace-nowrap text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  번호
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  답 란
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  채점
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr class="text-center" v-for="i in currentQuestionPage" :key="i">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ i + 1 }}
                </td>
                <td
                  class="px-6 py-4 font-bold whitespace-nowrap text-sm text-black"
                >
                  {{
                    selectedAnswers[i].answer !== null
                      ? typeof selectedAnswers[i].answer == "number"
                        ? selectedAnswers[i].answer + 1
                        : selectedAnswers[i].answer
                      : "-"
                  }}
                </td>
                <td
                  class="font-bold"
                  :class="{
                    'px-6 py-4 whitespace-nowrap text-sm text-gray-500':
                      selectedAnswers[i].isCorrect === null,
                    'px-6 py-4 whitespace-nowrap text-sm text-green-500':
                      selectedAnswers[i].isCorrect,
                    'px-6 py-4 whitespace-nowrap text-sm text-red-500':
                      selectedAnswers[i].isCorrect === false,
                  }"
                >
                  {{
                    selectedAnswers[i].isCorrect === null
                      ? "-"
                      : selectedAnswers[i].isCorrect
                      ? "O"
                      : "X"
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- 게임 종료 -->
      <div
        v-if="gameEnded"
        class="col-span-12 flex items-center justify-center h-screen"
      >
        <div class="text-center">
          <h1 class="text-4xl font-bold mb-4">게임 종료!</h1>
          <p class="text-lg mb-8">당신의 점수는 {{ totalScore }} 점입니다.</p>
          <button
            @click="restartGame"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
          >
            다시 시작
          </button>
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
  name: "SingleGame",
  data() {
    return {
      //문제 항목 클릭 여부
      componentKey: 0,
      loading: false,
      gameStarted: false,
      gameEnded: false,
      quizQuestions: [],
      currentQuizIndex: 0,
      selectedAnswerIndex: null,
      totalScore: 0,
      score: 0,
      timer: 0,
      intervalId: null,
      selectedAnswers: [],
      currentPage: 0,
      perPage: 10,
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
      this.shuffle(this.quizQuestions); //문제 랜덤하게 섞기
      //정답 객체 만들기
      for (var i = 0; i < this.quizQuestions.length; i++) {
        this.selectedAnswers[i] = {
          answer: null,
          isCorrect: null,
        };
      }
      console.log(this.quizQuestions);
      this.loading = true;
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  },

  computed: {
    currentQuestionPage() {
      console.log("currentQuestionsPage " + this.currentQuizIndex / 10);
      const start = this.currentPage * 10;
      const end =
        (this.currentPage + 1) * 10 < this.quizQuestions.length
          ? (this.currentPage + 1) * 10
          : this.quizQuestions.length;
      console.log(end);
      return Array.from({ length: end - start }, (_, i) => i + start);
    },
  },
  methods: {
    async requestQuizQuestion(quizType) {
      try {
        if (
          !history.state.theme ||
          !history.state.level ||
          !history.state.questionCount ||
          !quizType
        ) {
          throw new Error("게임 실행에 필요한 값이 없습니다.");
        }

        const response = await this.$axios.post(
          `${process.env.VUE_APP_BACKEND_ORIGIN}/api/chatGpt/chat/completion/content`,
          {
            theme: history.state.theme,
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
      this.gameEnded = false;
      console.log("게임이 시작됩니다!");
      this.startTimer();
    },
    nextPage() {
      this.currentPage++;
    },
    nextQuestion() {
      console.log("currentQuizIndex start Game" + this.currentQuizIndex);
      if (Math.floor(this.currentQuizIndex / 10) != this.currentPage)
        this.nextPage();
      if (this.selectedAnswerIndex !== null) {
        console.log(
          "정답: " + this.quizQuestions[this.currentQuizIndex].answer
        );
        this.totalScore = this.addScore(
          this.totalScore,
          this.selectedAnswerIndex
        );

        this.selectedAnswerIndex = null; // null로 초기화,

        console.log("점수: " + this.totalScore);
      }
      //채점하기
      this.selectedAnswers[this.currentQuizIndex].isCorrect = this.checkAnswer(
        this.selectedAnswers[this.currentQuizIndex].answer
      );
      // 다음문제로 넘어가기
      this.currentQuizIndex++;
      if (this.currentQuizIndex < this.quizQuestions.length) {
        console.log("this.currentQuizIndex : " + this.currentQuizIndex);
        this.startTimer();
      }
      if (this.currentQuizIndex == this.quizQuestions.length) {
        console.log("currentQUizIndex end Game" + this.currentQuizIndex);
        this.endGame();
      }
    },
    checkAnswer(selectedAnswer) {
      return (
        this.quizQuestions[this.currentQuizIndex].answer ===
        String(selectedAnswer)
      );
    },
    addScore(totalScore, selectedAnswer) {
      if (!this.isChoice4Quiz()) {
        selectedAnswer = this.$store.getters.getOXAnswer(
          this.selectedAnswerIndex
        );
      }
      if (this.checkAnswer(selectedAnswer)) totalScore += this.score;
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

    changeSelectedAnswerIndex(selectedAnswerIndex) {
      this.selectedAnswerIndex = selectedAnswerIndex;
      // this.selectedAnswers[this.currentQuizIndex]
      var selectedAnswer = 0;
      if (this.isChoice4Quiz()) {
        selectedAnswer = selectedAnswerIndex;
      } else {
        selectedAnswer = this.$store.getters.getOXAnswer(
          this.selectedAnswerIndex
        );
      }
      this.selectedAnswers[this.currentQuizIndex].answer = selectedAnswer;
    },
    isChoice4Quiz() {
      const quizType = this.quizQuestions[this.currentQuizIndex].quizType;

      return quizType === this.$store.getters.getChoice_4;
    },
    restartGame() {
      window.location.reload();
    },
    endGame() {
      this.gameEnded = true;
      this.gameStarted = false;
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      console.log(this.score);
      console.log(this.totalScore / this.score);
    },
  },
};
</script>
