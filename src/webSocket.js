import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import store from './store'; // Vuex store가 필요하면 import

const socketUrl = `${process.env.VUE_APP_BACKEND_ORIGIN}/chat`;

let stompClient;

export function getStompClient() {
  if (!stompClient) {
    const headers = {
      Authorization: `Bearer ${store.getters.getAccessToken}`, // Vuex store에서 가져온 JWT 토큰
    };
    const socket = new SockJS(socketUrl, null, {
      transports: ['websocket'],
      headers,
    });    
 
    stompClient = Stomp.over(socket);
    stompClient.connectHeaders = {
      Authorization: `Bearer ${store.getters.getAccessToken}`, // Vuex store에서 가져온 JWT 토큰
    };
    stompClient.debug = (str) => {
      console.log(str);
    };
    
  }
  return stompClient;
}