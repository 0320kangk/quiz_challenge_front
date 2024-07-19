<template>
  <div class="layout-default">
    <!-- 모달 창 -->
    <div
      v-if="isAnswer"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-lg p-8 px-20 shadow-lg text-center">
        <p class="text-9xl text-green-500 font-bold">O</p>
        <h2 class="text-2xl mt-4 font-bold mb-4">정답입니다!</h2>
      </div>
    </div>

    <!-- Incorrect Answer Modal -->
    <div
      v-if="isAnswer === false"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white rounded-lg p-8 px-20 shadow-lg text-center">
        <p class="text-9xl text-red-500 font-bold">X</p>

        <h2 class="text-2xl mt-4 font-bold mb-4">틀렸습니다!</h2>
      </div>
    </div>

    <div class="grid grid-cols-12">
      <div class="col-span-12 sm:col-span-9 border border-red-700">
        <!-- 게임 시작  -->
        <div
          v-if="
            !roomStatus.loading &&
            !roomStatus.gameStarted &&
            !roomStatus.gameEnded
          "
          class="flex items-center justify-center sm:h-full h-screen"
        >
          <div class="text-center">
            <h1 class="text-4xl font-bold mb-4">환영합니다!</h1>
            <p class="text-lg mb-8">
              게임을 시작하려면 아래의 버튼을 클릭하세요.
            </p>
            <button
              @click="startGame"
              :class="[
                'text-white font-bold py-3 px-6 rounded',
                {
                  'bg-blue-500 hover:bg-blue-700 cursor-pointer':
                    hostName === myInfo.name,
                  'bg-gray-500 cursor-not-allowed': hostName !== myInfo.name,
                },
              ]"
              :disabled="hostName !== myInfo.name"
            >
              게임 시작
            </button>
          </div>
        </div>
        <!-- loding  -->
        <div
          v-if="roomStatus.loading"
          class="flex flex-col items-center justify-center sm:h-screen h-full"
        >
          <div class="loader rounded-full w-24 h-24 mb-4"></div>
          <span class="text-gray-700 font-bold">Loading...</span>
        </div>
        <!-- 게임 문제 -->
        <div
          class="md:h-full"
          v-if="
            roomStatus.gameStarted && currentQuizIndex < quizQuestions.length
          "
        >
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

          <div class="flex justify-start">
            <div class="text-xl ml-10 mb-3 text-red-600 font-bold px-5">
              {{ timer }}
            </div>
          </div>
        </div>
        <!-- 게임 종료 -->
        <div
          v-if="roomStatus.gameEnded"
          class="flex items-center justify-center h-screen"
        >
          <div class="text-center">
            <h1 class="text-4xl font-bold mb-4">게임 종료</h1>
            <p class="text-lg mb-8">당신의 점수는 {{ myInfo.score }} 입니다.</p>
            <button
              @click="startGame"
              :class="[
                'text-white font-bold py-3 px-6 rounded',
                {
                  'bg-blue-500 hover:bg-blue-700 cursor-pointer':
                    hostName === myInfo.name,
                  'bg-gray-500 cursor-not-allowed': hostName !== myInfo.name,
                },
              ]"
              :disabled="hostName !== myInfo.name"
            >
              게임 다시 시작
            </button>
          </div>
        </div>
      </div>

      <!-- 퀴즈 문제 -->
      <!-- <div class="col-span-12 sm:col-span-9 border border-red-700">
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
          @click="change_bg_color"
          :id="'answer_' + i"
          class="ml-10 my-10 p-5 bg-gray-200 rounded-xl font-bold shadow-xl"
        >
          스프링에서 트랜잭션 관리를 위한 이노에션은 무엇인가?
        </div>
      </div> -->
      <div
        class="col-span-12 sm:col-span-3 border border-red-600 flex justify-center"
      >
        <div class="rounded overflow-hidden shadow-lg">
          <div class="grid grid-cols-2 grid-rows-2">
            <div
              v-for="(participant, index) in participants"
              :key="index"
              class="row-span-1"
            >
              <img
                class="w-full"
                src="../../assets/character/bear.png"
                alt="Sunset in the mountains"
              />
              <div
                class="font-bold text-center text-xs bg-gray-200 rounded-full px-3 py-1"
              >
                {{ participant.name }} <br />
                score: {{ participant.score }}
              </div>
            </div>
          </div>

          <div class="pt-2">
            <div
              class="h-96 sm:h-64 bg-blue-200 rounded-xl flex flex-col justify-between"
            >
              <div
                class="bg-blue-200 pl-2 text-white text-left py-2 rounded-t-xl"
              >
                💬 채팅
              </div>
              <!-- 채팅창 메시지 영역 -->
              <div
                ref="messageContainer"
                class="flex-grow px-4 py-8 overflow-y-auto custom-scrollbar"
              >
                <!-- 메시지 -->
                <div
                  v-for="(message, index) in messages"
                  :key="index"
                  class="mb-4"
                >
                  <!-- 메시지 내용 -->
                  <div v-if="message.isSent" class="flex flex-col items-end">
                    <div class="text-xs mr-1 text-gray-600 mb-1">
                      {{ message.writer }}
                    </div>
                    <div
                      class="max-w-xs px-4 py-2 bg-green-400 text-white text-xs rounded-lg"
                    >
                      {{ message.content }}
                    </div>
                  </div>
                  <div v-else class="flex flex-col items-start">
                    <div class="text-xs ml-1 text-gray-600 mb-1">
                      {{ message.writer }}
                    </div>
                    <div
                      class="max-w-xs px-4 py-2 bg-yellow-200 text-black text-xs rounded-lg"
                    >
                      {{ message.content }}
                    </div>
                  </div>
                </div>
              </div>
              <!-- 채팅 입력창 -->
              <div
                class="grid grid-cols-12 items-center border-t border-gray-300"
              >
                <input
                  type="text"
                  v-model="newMessage"
                  @keyup.enter="sendMessage"
                  placeholder="메시지를 입력하세요..."
                  class="col-span-10 py-2 text-sm border focus:outline-none"
                />
                <button
                  @click="sendMessage"
                  class="col-span-2 text-xs h-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                >
                  전송
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

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  border: 3px solid transparent;
}

.custom-scrollbar {
  scrollbar-width: thin; /* For Firefox */
  scrollbar-color: rgba(255, 255, 255, 0.5) transparent; /* For Firefox */
}
</style>
<script>
import { getStompClient } from "@/webSocket";

class RoomStatus {
  constructor(roomId, loading, gameStarted, gameEnded) {
    this.roomId = roomId;
    this.loading = loading;
    this.gameStarted = gameStarted;
    this.gameEnded = gameEnded;
  }
}
class Message {
  constructor(writer, content, isSent) {
    this.writer = writer;
    this.content = content;
    this.isSent = isSent;
  }
}
class Participant {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }
}
export default {
  name: "MultiGame",
  data() {
    // !loading && !gameStarted && !gameEnded
    return {
      isClicked: false,
      messages: [], // 채팅 메시지를 저장할 배열
      newMessage: "", // 입력된 새로운 메시지
      hostName: null,
      roomId: null,
      stompClient: null,
      roomInfo: null,
      roomStatus: new RoomStatus(null, false, false, false),
      quizQuestions: [],
      myInfo: new Participant(this.$store.getters.getMember.name),
      timer: 0,
      currentQuizIndex: 0,
      selectedAnswerIndex: null,
      selectedAnswer: null,
      isAnswer: null,
      participants: [],
      receivedScoreCount: 0,
      score: 0,
    };
  },
  //이것도 웹 소켓으로 해야하나?>
  created() {
    this.roomId = this.$route.params.roomId;
  },
  // 게임 방 데이터 얻기 (웹 소켓)
  // 웹 소켓 연결
  //게임 시작
  // ->>로딩 (문제 불러오기)
  //
  async mounted() {
    this.roomStatus.roomId = this.roomId;
    try {
      this.roomInfo = await this.requestRoomInfo();
      this.roomInfo.questionCount = parseInt(this.roomInfo.questionCount);
      this.score = 100 / this.roomInfo.questionCount; // 문제 당 점수 할당
      await this.connectWebMessage();
      this.enterSendMessage();
    } catch (e) {
      console.log(e);
    }
  },
  /*
  제대로 만들꺼면
  웹 소켓을 통해 방제목이나 이런것들을 받아야함 ...
  아니면 처음에는 요청
  그다음에는 웹 소켓 을 통해 ?
  */
  beforeUnmount() {
    this.stompClient.disconnectWebsocket();
  },
  methods: {
    async requestRoomInfo() {
      const response = await this.$axios.get(
        `${process.env.VUE_APP_BACKEND_ORIGIN}/api/gameRoom/${this.roomId}`,

        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    connectWebMessage() {
      this.stompClient = getStompClient();
      console.log("connectwebSocket test: ");
      return new Promise((resolve, reject) => {
        this.stompClient.connect(
          {
            Authorization: `Bearer ${this.$store.getters.getAccessToken}`, // Vuex store에서 가져온 JWT 토큰
            roomId: this.roomId,
          },
          (frame) => {
            console.log("Connected: " + frame);
            this.stompClient.subscribe(
              `/subscribe/notification/room/${this.roomId}`,
              this.receivedNotificationMessage
            );
            this.stompClient.subscribe(
              `/subscribe/chat/room/${this.roomId}`,
              this.receivedChatMessage
            );
            this.stompClient.subscribe(
              `/subscribe/quiz/room/${this.roomId}`,
              this.receivedQuizMessage
            );
            this.stompClient.subscribe(
              `/subscribe/status/room/${this.roomId}`,
              this.receivedRoomStatusMessage
            );
            this.stompClient.subscribe(
              `/subscribe/score/room/${this.roomId}`,
              this.receivedScoreMessage
            );
            this.stompClient.subscribe(
              `/subscribe/enter/room/${this.roomId}`,
              this.receivedEnterRoomMessage
            );

            resolve(frame);
          },
          (error) => {
            console.error("Connection error: " + error);
            reject(error);
          }
        );
      });
    },

    /*
    1. 문제 타이머 마다 클라이언트에서 검사해
    2. 문제 만들기 publish
    2. 문제 요청 하면 subscribe
    */
    receivedEnterRoomMessage(message) {
      const enterRoomObject = JSON.parse(message.body);
      console.log("enter room message : ");
      console.log(enterRoomObject);
      this.addMessage(enterRoomObject.content, enterRoomObject.writer);
      this.participants = [];
      for (var name of enterRoomObject.participateNames) {
        this.participants.push(new Participant(name));
      }
      this.hostName = enterRoomObject.hostName;
      this.scrollToBottom();
    },

    receivedQuizMessage(message) {
      const quizObject = JSON.parse(message.body);
      console.log("quiz 문제 : " + message.body);

      this.quizQuestions = this.quizQuestions.concat(quizObject);
      console.log("quiz 문제 수 " + this.quizQuestions.length);
      console.log("rooInfo questionCount : " + this.roomInfo.questionCount);
    },
    receivedScoreMessage(message) {
      const messageObject = JSON.parse(message.body);
      const participant = this.participants.find(
        (participant) => participant.name === messageObject.name
      );
      participant.score = messageObject.score;
      console.log("recevied score name : " + messageObject.name);
      console.log("recevied score " + messageObject.score);
      this.receivedScoreCount++;
    },
    receivedChatMessage(message) {
      const messageObject = JSON.parse(message.body);
      this.addMessage(messageObject.content, messageObject.writer);
      this.scrollToBottom();
    },
    receivedNotificationMessage(message) {
      const messageObject = JSON.parse(message.body);
      this.hostName = messageObject.hostName;
      console.log("host name: ", messageObject);
    },
    receivedRoomStatusMessage(message) {
      const messageObject = JSON.parse(message.body);
      console.log("roomStatus message", messageObject);
      this.roomStatus = messageObject;
    },
    requestQuizQuestion() {
      console.log("requestQuizQuestion");
      var chatQuizRequestDto = {
        roomId: this.roomId,
        quizType: this.$store.getters.getChoice_4,
      };
      this.stompClient.publish({
        destination: `/publish/chat/room/quiz`,
        body: JSON.stringify(chatQuizRequestDto),
      });
      chatQuizRequestDto.quizType = this.$store.getters.getOX;
      this.stompClient.publish({
        destination: `/publish/chat/room/quiz`,
        body: JSON.stringify(chatQuizRequestDto),
      });
    },
    addMessage(content, writer) {
      var isSent = false;
      if (this.$store.getters.getMember.name === writer) isSent = true;
      this.messages.push(new Message(writer, content, isSent));
    },
    shuffle(questions) {
      for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
      }
    },
    enterSendMessage() {
      console.log("enterSendMessage");
      const chatMessage = {
        writer: this.$store.getters.getMember.name, // 예시로 작성자의 이름을 Vuex에서 가져온다고 가정
        roomId: this.roomId,
      };
      this.stompClient.publish({
        destination: "/publish/chat/room/enter",
        body: JSON.stringify(chatMessage),
      });
    },
    startGame() {
      console.log("퀴즈 게임을 만듭니다. !");
      this.publishRoomStatus(true, false, false); // 로딩 상태 알림
      this.requestQuizQuestion(); //퀴즈 문제 요청
    },
    publishRoomStatus(loading, gameStarted, gameEnded) {
      const roomStatusDto = new RoomStatus(
        this.roomId,
        loading,
        gameStarted,
        gameEnded
      );
      this.stompClient.publish({
        destination: "/publish/chat/room/status",
        body: JSON.stringify(roomStatusDto),
      });
    },
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        const chatMessage = {
          writer: this.$store.getters.getMember.name, // 예시로 작성자의 이름을 Vuex에서 가져온다고 가정
          message: this.newMessage,
          roomId: this.roomId,
        };
        this.stompClient.publish({
          destination: "/publish/chat/room/message",
          body: JSON.stringify(chatMessage),
        });
        this.newMessage = "";
      }
    },
    publishMyScore() {
      this.stompClient.publish({
        destination: `/publish/chat/room/score/${this.roomId}`,
        body: JSON.stringify(this.myInfo),
      });
    },
    isChoice4Quiz() {
      const quizType = this.quizQuestions[this.currentQuizIndex].quizType;
      return quizType === this.$store.getters.getChoice_4;
    },

    changeSelectedAnswerIndex(selectedAnswerIndex) {
      this.selectedAnswerIndex = selectedAnswerIndex;
      var selectedAnswer = 0;
      if (this.isChoice4Quiz()) {
        selectedAnswer = selectedAnswerIndex;
      } else {
        selectedAnswer = this.$store.getters.getOXAnswer(
          this.selectedAnswerIndex
        );
      }
      console.log(selectedAnswer);
      this.selectedAnswer = selectedAnswer;
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

          //채점
          //결과창(모달)
          //결과 publish
          //2초뒤 다음문제
        }
      }, 300);
    },
    nextQuestion() {
      //채점하기,
      this.gradeQuizQuestion();
      //결과 확인
      this.isAnswer = this.checkAnswer(this.selectedAnswer);
      //결과 publish,
      this.publishMyScore();
      //결과 구독 후 문제 넘기기
      this.currentQuizIndex++; //다음 문제
    },
    gradeQuizQuestion() {
      if (this.selectedAnswerIndex !== null) {
        console.log(
          "정답: " + this.quizQuestions[this.currentQuizIndex].answer
        );
        this.myInfo.score = this.addScore(
          this.myInfo.score,
          this.selectedAnswerIndex
        );
        console.log("점수: " + this.myInfo.score);
      }
    },
    addScore(myScore, selectedAnswer) {
      console.log("myScore : " + myScore);
      if (!this.isChoice4Quiz()) {
        selectedAnswer = this.$store.getters.getOXAnswer(
          this.selectedAnswerIndex
        );
      }
      if (this.checkAnswer(selectedAnswer)) myScore += this.score;
      return myScore;
    },
    checkAnswer(selectedAnswer) {
      return (
        this.quizQuestions[this.currentQuizIndex].answer ===
        String(selectedAnswer)
      );
    },
    //요청해야함 방정보를
    scrollToBottom() {
      this.$nextTick(() => {
        // 채팅창 요소에 접근하여 스크롤을 아래로 내림
        const messageContainer = this.$refs.messageContainer;
        messageContainer.scrollTop = messageContainer.scrollHeight;
      });
    },
  },
  watch: {
    quizQuestions(newVal) {
      if (this.roomInfo.questionCount === newVal.length) {
        //게임 시작 상태로 변경
        console.log("게임 시작 상태로 바꾸기");
        this.roomStatus.loading = false;
        this.roomStatus.gameStarted = true;
        this.roomStatus.gameEnded = false;
      }
    },
    "roomStatus.gameStarted"(newVal) {
      if (newVal) {
        this.startTimer();
      }
    },
    receivedScoreCount(newVal) {
      //이렇게 만들지 말고 그냥 1초 기다렸다 다음 문제 나오는게
      if (newVal === this.participants.length) {
        setTimeout(() => {
          // 다음 문제로 넘어가기
          this.selectedAnswerIndex = null; // 선택한 답 idx 초기화
          this.receivedScoreCount = 0;
          this.isAnswer = null;
          console.log("현재퀴즈 번호 : " + this.currentQuizIndex);

          if (this.currentQuizIndex < this.quizQuestions.length) {
            this.startTimer();
          } else {
            this.currentQuizIndex = 0;
            this.roomStatus.gameStarted = false;
            this.roomStatus.loading = false;
            this.roomStatus.gameEnded = true;
          }
        }, 1000);
      }
    },
    /*
    지금 구현 안 된 것이
    다시 시작, 연결 종료, 방장,중간에 사람이 나간다면?

    */
  },
};
</script>
