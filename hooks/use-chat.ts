"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface ChatMessage {
  id: string;
  avatar: string;
  name: string;
  badge: { label: string; variant: "local" | "visitor" };
  content: string;
  timestamp: number;
}

export interface UserIdentity {
  avatar: string;
  name: string;
  badge: { label: string; variant: "local" | "visitor" };
}

type WSServerEvent =
  | {
      type: "init";
      messages: ChatMessage[];
      onlineCount: number;
    }
  | { type: "new_message"; message: ChatMessage }
  | { type: "online_count"; count: number };

type ConnectionStatus = "connecting" | "connected" | "disconnected";

const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:4000";
const RECONNECT_DELAY = 3000;

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [onlineCount, setOnlineCount] = useState(0);
  const [status, setStatus] = useState<ConnectionStatus>("connecting");

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    setStatus("connecting");
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus("connected");
    };

    ws.onmessage = (e) => {
      const event: WSServerEvent = JSON.parse(e.data);

      switch (event.type) {
        case "init":
          setMessages(event.messages);
          setOnlineCount(event.onlineCount);
          break;
        case "new_message":
          setMessages((prev) => [...prev, event.message]);
          break;
        case "online_count":
          setOnlineCount(event.count);
          break;
      }
    };

    ws.onclose = () => {
      setStatus("disconnected");
      wsRef.current = null;
      reconnectTimer.current = setTimeout(connect, RECONNECT_DELAY);
    };

    ws.onerror = () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    connect();
    return () => {
      clearTimeout(reconnectTimer.current);
      wsRef.current?.close();
    };
  }, [connect]);

  const sendMessage = useCallback(
    (content: string, avatar: string, name: string) => {
      const ws = wsRef.current;
      if (!ws || ws.readyState !== WebSocket.OPEN) return;
      ws.send(JSON.stringify({ type: "send_message", content, avatar, name }));
    },
    []
  );

  return { messages, onlineCount, status, sendMessage };
}
