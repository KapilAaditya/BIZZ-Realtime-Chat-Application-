import React from "react";
import { MessageSquareTextIcon, SparklesIcon } from "lucide-react";

export function NoConversationPlaceholder() {
  return (
    <div className="relative flex min-h-[300px] flex-1 flex-col items-center justify-center gap-5 px-4 py-12 text-center select-none">
      
      {/* Ambient background glow */}
      <div className="absolute h-48 w-48 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      {/* Main Icon Container */}
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-800/80 bg-slate-900/60 shadow-xl backdrop-blur-md transition-all duration-500 hover:scale-105 hover:border-slate-700/80">
        
        {/* Subtle accent corner badge */}
        <div className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/20">
          <SparklesIcon className="h-3.5 w-3.5" strokeWidth={2} />
        </div>

        <MessageSquareTextIcon className="h-9 w-9 text-blue-400" strokeWidth={1.5} />
      </div>

      {/* Text Container */}
      <div className="max-w-xs space-y-2 relative z-10">
        <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">
          Select a chat to start
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Pick a conversation or user from the sidebar on the left to read messages and start messaging.
        </p>
      </div>

    </div>
  );
}

export default NoConversationPlaceholder;