// src/services/socket.js
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { getApiUrl } from "../Utils/AuthRequestProvider";

let client;

export function connectSocket(userId, onMessage) {
  const API_URL = getApiUrl();

  console.log("API_URL =", API_URL);
  console.log("USER_ID =", userId);

  const socket = new SockJS(`http://${API_URL}/ws`);

  client = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,

    onConnect: () => {
      console.log("✅ WEBSOCKET CONECTADO");

      client.subscribe(`/queue/aluno/${userId}`, (msg) => {
        console.log("📩 MENSAGEM RECEBIDA:", msg.body);

        const data = JSON.parse(msg.body);
        onMessage(data);
      });
    },

    onStompError: (frame) => {
      console.log("❌ STOMP ERROR", frame);
    },

    onWebSocketError: (error) => {
      console.log("❌ WS ERROR", error);
    }
  });

  client.activate();
}