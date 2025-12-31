import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessagesProps {
  id: string;
  type: "assistant" | "human";
  content: string;
}

const Messages: React.FC<MessagesProps> = ({ type, content }) => {
  return (
    <div
      className={`flex ${type === "human" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-lg ${
          type === "human" ? "items-end" : "items-start"
        } flex flex-col gap-2`}
      >
        {type === "assistant" && (
          <div className="text-xs font-medium text-neutral-400">Agent</div>
        )}
        <div
          className={`px-4 py-3 rounded-lg ${
            type === "human"
              ? "bg-green-600 text-white"
              : "bg-neutral-800 text-neutral-100"
          }`}
        >
          <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default Messages;
