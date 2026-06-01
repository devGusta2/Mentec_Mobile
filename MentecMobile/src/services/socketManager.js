import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { getApiUrl } from '../../Utils/AuthRequestProvider';
import { emitNotification } from '../notifications/NotificationBus';

let client = null;
let activeUserId = null;

function getWebSocketUrl() {
  const apiUrl = getApiUrl();
  const baseUrl = String(apiUrl || '').replace(/^https?:\/\//, '');
  const normalizedHost = baseUrl.includes('://') ? baseUrl : `http://${baseUrl}`;
  return `${normalizedHost}/ws`;
}

export function disconnectSocket() {
  if (client) {
    try {
      client.deactivate();
    } catch (error) {
      console.log('Socket deactivation error:', error);
    }
  }

  client = null;
  activeUserId = null;
}

export function connectSocket(userId) {
  if (!userId) return;

  if (client && activeUserId === userId) {
    return;
  }

  disconnectSocket();
  activeUserId = userId;

  const socket = new SockJS(getWebSocketUrl());

  client = new Client({
    webSocketFactory: () => socket,

    reconnectDelay: 5000,

    debug: (msg) => {
      console.log("STOMP:", msg);
    },

    onConnect: () => {
      console.log("SOCKET CONECTADO");

      client.subscribe(`/queue/aluno/${userId}`, (msg) => {
        console.log("MENSAGEM RECEBIDA:", msg.body);

        const data = JSON.parse(msg.body);

        console.log("ENVIANDO PARA O BUS:", data);

        emitNotification(data);
      });
    },

    onStompError: (frame) => {
      console.log("STOMP ERROR:", frame);
    },

    onWebSocketError: (event) => {
      console.log("WEBSOCKET ERROR:", event);
    },

    onWebSocketClose: (event) => {
      console.log("WEBSOCKET CLOSED:", event);
    }
  });

  client.activate();
}
