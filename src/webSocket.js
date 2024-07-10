import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import store from "./store"; // Vuex store가 필요하면 import
import router from './router'; // Vue Router import

const socketUrl = `${process.env.VUE_APP_BACKEND_ORIGIN}/chat`;

var stompClient;

export function getStompClient() {
  if (!stompClient) {
    const headers = {
      Authorization: `Bearer ${store.getters.getAccessToken}`,// Vuex store에서 가져온 JWT 토큰
      roomId: null 
    };
    const socket = new SockJS(socketUrl, null, {
      transports: ["websocket"],
      headers,
    });

    stompClient = Stomp.over(socket);
    stompClient.connectHeaders = headers
    stompClient.debug = (str) => {
      console.log(str);
    };
    stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
      router.push("/gameRooms");
      // 추가적인 에러 핸들링 로직
    };
  
    stompClient.onWebSocketClose = (event) => {
      console.log('WebSocket connection closed:', event);
      if(stompClient !== null){
        stompClient.disconnect();
      }
    };
    //클라이언트에서 연결을 끊었을 때
    stompClient.disconnectWebsocket = () => {
      if (stompClient && stompClient.connected) {
          stompClient.disconnect();
          console.log("WebSocket disconnected");
          stompClient = null; // 연결 끊기 후 클라이언트 객체 초기화
      }
    }
  }
  return stompClient;
}



