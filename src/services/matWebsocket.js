// src/services/matWebSocket.js

let socket;
let listeners = [];

export const connectToMat = () => {
  socket = new WebSocket('ws://localhost:4000');

  socket.onopen = () => console.log('WebSocket connected to mat');
  socket.onclose = () => console.log('WebSocket disconnected');
  socket.onerror = (err) => console.error('WebSocket error:', err);

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === 'pressed') {
      listeners.forEach((cb) => cb(message.index));
    }
  };
};

export const onCirclePress = (callback) => {
  listeners.push(callback);
};

export const disconnectMat = () => {
  if (socket) {
    socket.close();
  }
  listeners = [];
};
