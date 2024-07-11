<template>
  <div class="layout-default">
    <div class="grid grid-cols-12">
      <div class="col-span-12 sm:col-span-8 border border-red-700">
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
      </div>
      <div
        class="col-span-12 sm:col-span-4 border border-red-600 flex justify-center"
      >
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
          <div class="grid grid-cols-2 grid-rows-2">
            <div class="row-span-1">
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
            </div>
            <div class="row-span-1">
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
            </div>
            <div class="row-span-1">
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
            </div>
            <div class="row-span-1">
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
            </div>
          </div>

          <div class="pt-4 pb-2">
            <div
              class="h-64 bg-blue-200 rounded-xl flex flex-col justify-between"
            >
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
                      class="max-w-xs px-4 py-2 bg-green-400 text-white text-sm rounded-lg"
                    >
                      {{ message.content }}
                    </div>
                  </div>
                  <div v-else class="flex flex-col items-start">
                    <div class="text-xs ml-1 text-gray-600 mb-1">
                      {{ message.writer }}
                    </div>
                    <div
                      class="max-w-xs px-4 py-2 bg-yellow-200 text-black text-sm rounded-lg"
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
                  class="col-span-10 py-2 border focus:outline-none"
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

export default {
  name: "MultiGame",
  data() {
    return {
      isClicked: false,
      messages: [], // 채팅 메시지를 저장할 배열
      newMessage: "", // 입력된 새로운 메시지
      roomId: null,
      stompClient: null,
    };
  },
  created() {
    this.roomId = this.$route.params.roomId;
  },
  async mounted() {
    try {
      await this.connectWebSocket();
      console.log();
      this.enterSendMessage();
    } catch (e) {
      console.log(e);
    }
  },
  beforeUnmount() {
    this.stompClient.disconnectWebsocket();
  },
  methods: {
    connectWebSocket() {
      this.stompClient = getStompClient();
      console.log("connectwebSocket test: ");
      console.log(this.stompClient.status);
      return new Promise((resolve, reject) => {
        this.stompClient.connect(
          {
            Authorization: `Bearer ${this.$store.getters.getAccessToken}`, // Vuex store에서 가져온 JWT 토큰
            roomId: this.roomId,
          },
          (frame) => {
            console.log("Connected: " + frame);
            this.stompClient.subscribe(
              `/subscribe/chat/room/${this.roomId}`,
              (message) => {
                const messageObject = JSON.parse(message.body);
                var isSent = false;
                if (this.$store.getters.getMember.name === messageObject.writer)
                  isSent = true;

                this.messages.push({
                  content: messageObject.message,
                  writer: messageObject.writer,
                  isSent: isSent,
                });
              }
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
    change_bg_color(e) {
      // 색상 변경 로직
      const elements = document.querySelectorAll('[id^="answer_"]');
      elements.forEach((element) => {
        element.classList.remove("bg-yellow-200");
      });
      e.target.classList.add("bg-yellow-200");
      console.log(e.target.className);
    },
    sendMessage() {
      // if (this.newMessage.trim() !== "") {
      //   // 새로운 메시지를 배열에 추가
      //   this.messages.push({
      //     content: this.newMessage,
      //     isSent: true, // 메시지가 보낸 것인지 여부
      //   });
      //   // 입력창 초기화
      //   this.newMessage = "";

      // }

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
      this.$nextTick(() => {
        // 채팅창 요소에 접근하여 스크롤을 아래로 내림
        const messageContainer = this.$refs.messageContainer;
        messageContainer.scrollTop = messageContainer.scrollHeight;
      });
    },
  },
};
</script>
