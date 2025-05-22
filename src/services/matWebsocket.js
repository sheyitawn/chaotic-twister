let socket;
let resultListeners = [];
let circleListeners = [];

export const connectToMat = () => {
    if (socket && socket.readyState === WebSocket.OPEN) return;

    socket = new WebSocket('ws://localhost:4000');

    socket.onmessage = (event) => {
  console.log("📨 WS message:", event.data);
  try {
    const data = JSON.parse(event.data);
    if (data.type === 'result') {
      console.log("🧠 Mat result:", data.value);
      resultListeners.forEach((cb) => cb(data.value));
    } else if (data.type === 'pressed') {
      console.log("📍 Mat press:", data.index);
      circleListeners.forEach((cb) => cb(data.index));
    }
  } catch (err) {
    console.error('Invalid message:', event.data);
  }
};


    socket.onopen = () => {
        console.log("🟢 WebSocket connected");
    };
    socket.onclose = () => {
        console.log("🔴 WebSocket disconnected");
    };

};

export const sendColourToMat = (letter) => {
  if (socket?.readyState === WebSocket.OPEN) {
    socket.send(letter);
    console.log(`🎯 Sent colour to Arduino: ${letter}`);
  } else {
    console.warn("⚠️ WebSocket not open. Could not send:", letter);
  }
};


export const startCalibrationMode = () => {
  if (socket?.readyState === WebSocket.OPEN) {
    socket.send("CALIBRATE");
  }
};

export const onMatResult = (callback) => resultListeners.push(callback);
export const onCirclePress = (callback) => circleListeners.push(callback);

export const disconnectMat = () => {
  if (socket) socket.close();
  socket = null;
  resultListeners = [];
  circleListeners = [];
};

export const updateCurrentPlayer = (playerNumber) => {
  if (socket?.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type: 'updatePlayer', number: playerNumber }));
  }
};
