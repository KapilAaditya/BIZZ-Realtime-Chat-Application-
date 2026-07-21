import React from "react";
import useScrollToBottom from "../../hooks/useScrollToBottom";
import { MessageBubble } from "./MessageBubble";
import { NoConversationPlaceholder } from "./NoConversationPlaceholder";
import { useSelectedConversation } from "../../hooks/useSelectedConversation";
import { SparklesIcon } from "lucide-react";

export function MessageList() {
  const { activeConversation, activeConversationId } = useSelectedConversation();

  const messages = activeConversation?.messages || [];
  const lastMessageId = messages.at(-1)?.id;
  const messagesScrollRef = useScrollToBottom(activeConversationId, lastMessageId);

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-slate-950/20 backdrop-blur-xs">
      {activeConversation ? (
        <div
          ref={messagesScrollRef}
          className="flex flex-1 flex-col gap-1.5 overflow-y-auto overscroll-contain px-2 py-3 sm:px-4 sm:py-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent"
        >
          {messages.length === 0 ? (
            /* Selected conversation is empty state */
            <div className="my-auto flex flex-col items-center justify-center gap-2 text-center select-none py-12">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800/80 bg-slate-900/60 shadow-md">
                <SparklesIcon className="h-5 w-5 text-blue-400" />
              </div>
              <p className="text-sm font-semibold text-white">
                No messages yet
              </p>
              <p className="text-xs text-slate-400">
                Send a message to kick off the conversation with {activeConversation.peer?.name || "them"}.
              </p>
            </div>
          ) : (
            <>
              {/* Date Header Separator */}
              <div className="my-2 flex items-center justify-center">
                <span className="rounded-full border border-slate-800/60 bg-slate-900/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 backdrop-blur-sm">
                  Today
                </span>
              </div>

              {/* Message Feed Stack */}
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </>
          )}
        </div>
      ) : (
        /* No Active Conversation Selected */
        <NoConversationPlaceholder />
      )}
    </div>
  );
}

export default MessageList;