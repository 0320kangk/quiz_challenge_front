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
  mounted() {
    this.connectWebSocket();
  },
  beforeUnmount() {
    this.stompClient.disconnectWebsocket();
  },
  methods: {
    connectWebSocket() {
      this.stompClient = getStompClient();
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
              this.messages.push({
                content: messageObject.message,
                isSent: true,
              });
            }
          );
        },
        (error) => {
          console.error("Connection error: " + error);
        }
      );
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
