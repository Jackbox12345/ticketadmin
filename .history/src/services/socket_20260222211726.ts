let socket: WebSocket | null = null;
let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

const WS_URL = "ws://localhost:8080";

export function connectSocket(onMessage: (data: any) => void) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    return socket;
  }

  socket = new WebSocket(WS_URL);

  socket.onopen = () => {
    console.log("✅ WebSocket connected");
  };

  socket.onmessage = (event) => {
  console.log("RAW:", event.data);

  const parsed = JSON.parse(event.data);
  console.log("PARSED:", parsed);

  onMessage(parsed);
};

  socket.onclose = () => {
    console.log("❌ WebSocket disconnected");
    socket = null;

    // Auto reconnect
    reconnectTimeout = setTimeout(() => {
      console.log("🔄 Reconnecting...");
      connectSocket(onMessage);
    }, 2000);
  };

  socket.onerror = (err) => {
    console.error("WebSocket error:", err);
    socket?.close();
  };

  return socket;
}

export function sendMessage(data: unknown) {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    console.warn("Socket not connected");
    return;
  }

  socket.send(JSON.stringify(data));
}

export function disconnectSocket() {
  reconnectTimeout && clearTimeout(reconnectTimeout);
  socket?.close();
  socket = null;
}