import { cn } from "@/lib/utils";

interface VoiceStatusBarProps {
  isListening: boolean;
  interimTranscript: string;
}

export function VoiceStatusBar({ isListening, interimTranscript }: VoiceStatusBarProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 border-t border-gray-700/50 bg-black/10">
      <div className="flex items-center gap-2 flex-shrink-0">
        <span
          className={cn("size-3 rounded-full transition-colors", isListening ? "bg-red-500 animate-pulse" : "bg-green-500")}
          aria-hidden="true"
        />
        <span className="text-sm font-medium text-gray-300 w-24">
          {isListening ? "Listening..." : "Voice Idle"}
        </span>
      </div>
      <p className="text-sm text-gray-400 flex-1 italic truncate" aria-live="polite">
        {interimTranscript || "..."}
      </p>
    </div>
  );
}
