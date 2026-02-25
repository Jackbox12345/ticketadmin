let socket: WebSocket | null = null;
let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
let manuallyClosed = false;

const WS_URL = "ws://localhost:8080";

export function connectSocket(onMessage: (data: any) => void) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    return socket;
  }

  manuallyClosed = false;
  socket = new WebSocket(WS_URL);

  socket.onopen = () => {
    console.log("✅ WebSocket connected");
  };

 socket.onmessage = (event) => {
  console.log("RAW EVENT:", event.data);
};

  socket.onclose = () => {
    console.log("❌ WebSocket disconnected");
    socket = null;

    if (!manuallyClosed) {
      reconnectTimeout = setTimeout(() => {
        console.log("🔄 Reconnecting...");
        connectSocket(onMessage);
      }, 2000);
    }
  };

  socket.onerror = () => {
    socket?.close();
  };

  return socket;
}

export function disconnectSocket() {
  manuallyClosed = true;
  reconnectTimeout && clearTimeout(reconnectTimeout);
  socket?.close();
  socket = null;
}