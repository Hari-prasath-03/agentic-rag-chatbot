import { useEffect, useRef, useState } from "react";
import ChatTextArea from "../components/chat-text-area";
import ConverstionAres from "../components/conversation-area";
import Header from "../components/header";
import Messages from "../components/messages";
import AuthPopup from "../components/auth-popup";
import usePopupModel from "../hooks/use-popup-model";
import { fetchUserData, healthCheck, logout } from "../api";
import toast from "react-hot-toast";
import Loader from "../components/loader";

export type Message = {
  id: string;
  type: "assistant" | "human";
  content: string;
};

const ChatInterface = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem("chat-messages");
    return savedMessages
      ? JSON.parse(savedMessages)
      : [
          {
            id: new Date().toISOString(),
            type: "assistant",
            content:
              "I'm an AI agent who can able to **search the web** for information, **read any URL** you share, and **analyze GitHub profiles** to pull insights. \n\nWhat would you like to know?",
          },
        ];
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [open, Backdrop, close] = usePopupModel({
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  });

  const addMessage = (message: Message) =>
    setMessages((pv) => [...pv, message]);

  const handleLogout = () => {
    logout().then((data) => {
      toast.success(data || "Logged out successfully!");
      setIsLoggedIn(false);
      setUsername(undefined);
    });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    localStorage.setItem("chat-messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    healthCheck().then((data) => console.log(data));
    fetchUserData()
      .then((res) => {
        setIsLoggedIn(true);
        setUsername(res.name);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUsername(undefined);
      });
  }, []);

  return (
    <div className="flex flex-col h-screen bg-neutral-950 text-neutral-100">
      <Header
        login={open}
        logout={handleLogout}
        username={username}
        isLoggedIn={isLoggedIn}
      />
      <ConverstionAres>
        {messages.map((msg) => (
          <Messages key={msg.id} {...msg} />
        ))}
        <Loader isLoading={isLoading} />
        <div ref={messagesEndRef} />
      </ConverstionAres>
      <ChatTextArea
        isLoading={isLoading}
        addMessage={addMessage}
        setIsLoading={setIsLoading}
      />
      <Backdrop>
        <AuthPopup closePopup={close} />
      </Backdrop>
    </div>
  );
};

export default ChatInterface;
