import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Message } from "./mira-chat";

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <div className={cn("flex items-start gap-3 w-full", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="flex-shrink-0 size-10 rounded-full bg-gray-700 flex items-center justify-center border border-gray-600">
          <Bot className="size-5 text-gray-300" />
        </div>
      )}
      <div
        className={cn(
          "p-3 rounded-2xl max-w-sm md:max-w-md lg:max-w-lg shadow-md",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-gray-700 text-gray-200 rounded-bl-none"
        )}
      >
        <ReactMarkdown>{message.content}</ReactMarkdown>
      </div>
       {isUser && (
        <div className="flex-shrink-0 size-10 rounded-full bg-primary flex items-center justify-center border border-blue-400">
          <User className="size-5 text-primary-foreground" />
        </div>
      )}
    </div>
  );
}
