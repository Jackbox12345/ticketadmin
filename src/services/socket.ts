let socket: WebSocket | null = null;
let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
let manuallyClosed = false;

const WS_URL = import.meta.env.VITE_WS_URL ?? "ws://localhost:8080";

export function connectSocket(onMessage: (data: unknown) => void) {
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

  try {
    const parsed = JSON.parse(event.data);
    onMessage(parsed); // 👈 THIS IS REQUIRED
  } catch (e) {
    console.error("JSON parse error:", e);
  }
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
  if (reconnectTimeout) clearTimeout(reconnectTimeout);
  socket?.close();
  socket = null;
}
