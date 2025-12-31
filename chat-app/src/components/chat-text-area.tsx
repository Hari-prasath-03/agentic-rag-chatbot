import { Send } from "lucide-react";
import { useState } from "react";
import type { Message } from "../pages/chat-interface";
import { submitQuery } from "../api";

interface ChatTextAreaProps {
  isLoading: boolean;
  addMessage: (message: Message) => void;
  setIsLoading: (loading: boolean) => void;
}

const ChatTextArea: React.FC<ChatTextAreaProps> = ({
  addMessage,
  isLoading,
  setIsLoading,
}) => {
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim() || isLoading) return;
    const trimmedInput = input.trim();
    setIsLoading(true);
    addMessage({
      id: Date.now().toString(),
      type: "human",
      content: trimmedInput,
    });
    submitQuery(trimmedInput).then((res) => {
      addMessage({
        id: Date.now().toString(),
        type: "assistant",
        content: res.answer,
      });
      setIsLoading(false);
    });
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="border-t border-neutral-800 bg-neutral-900 px-4 py-6">
      <div className="max-w-3xl mx-auto flex gap-3">
        <textarea
          value={input}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Drop your query or a URL here..."
          rows={2}
          className="flex-1 px-4 py-3 rounded-lg border border-neutral-700 bg-neutral-800 text-neutral-100 placeholder-neutral-500 resize-none focus:outline-none focus:ring-1 focus:ring-green-500 transition-all"
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !input.trim()}
          className={`px-4 py-3 rounded-lg transition-colors text-white flex items-center justify-center ${
            input.trim() || isLoading
              ? "bg-green-500 hover:bg-green-600 cursor-pointer"
              : "bg-neutral-700 cursor-not-allowed"
          }`}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatTextArea;
