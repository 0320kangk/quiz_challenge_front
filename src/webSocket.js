import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const socketUrl = "http://localhost:8080/chat"; // 서버 WebSocket 엔드포인트

const createStompClient = () => {
  const stompClient = new Client({
    brokerURL: socketUrl,
    connectHeaders: {
      Authorization: `Bearer ${this.store.getters.getAccessToken}`, // Vuex store에서 가져온 JWT 토큰
    },
    webSocketFactory: () => new SockJS(socketUrl),
    debug: (str) => {
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  // 기본 onConnect 정의
  stompClient.onConnect = (frame) => {
    console.log("Connected: " + frame);
  };

  // 기본 onStompError 정의
  stompClient.onStompError = (frame) => {
    console.error("Broker reported error: " + frame.headers["message"]);
    console.error("Additional details: " + frame.body);
  };

  return stompClient;
};

export default createStompClient;
