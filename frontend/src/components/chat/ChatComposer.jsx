import React, { useRef } from "react";
import { Button, TextArea } from "@heroui/react";
import { ImageIcon, LoaderIcon, SendHorizontalIcon } from "lucide-react";
import useKeyboardSound from "../../hooks/useKeyboardSound.js";
import { useChatStore } from "../../store/userChatStore.js";
import { useSelectedConversation } from "../../hooks/useSelectedConversation.js";

export function ChatComposer() {
  const composerText = useChatStore((state) => state.composerText);
  const isSoundEnabled = useChatStore((state) => state.isSoundEnabled);
  const sendMediaMessage = useChatStore((state) => state.sendMediaMessage);
  const isSendingMedia = useChatStore((state) => state.isSendingMedia);
  const sendTextMessage = useChatStore((state) => state.sendTextMessage);
  const setComposerText = useChatStore((state) => state.setComposerText);

  const { activeConversationId } = useSelectedConversation();
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const mediaInputRef = useRef(null);

  const playSoundIfEnabled = () => {
    if (isSoundEnabled && typeof playRandomKeyStrokeSound === "function") {
      playRandomKeyStrokeSound();
    }
  };

  const handleSend = async () => {
    if (!composerText.trim()) return;
    await sendTextMessage(activeConversationId);
  };

  const handleKeyDown = (event) => {
    // Send message on Enter (without Shift)
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
      return;
    }

    // Play keystroke sound for all typing key presses
    playSoundIfEnabled();
  };

  const handleMediaPick = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    await sendMediaMessage({
      conversationId: activeConversationId,
      file,
    });
  };

  return (
    <footer className="shrink-0 border-t border-border bg-slate-950/40 backdrop-blur-md px-1.5 pb-2.5 pt-2 sm:px-3 sm:pb-3">
      {/* Media Upload Progress Indicator */}
      {isSendingMedia ? (
        <div className="mx-auto mb-2 flex max-w-full items-center gap-2 rounded-xl border border-slate-800/80 bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-slate-300 shadow-lg backdrop-blur-md animate-in fade-in">
          <LoaderIcon
            className="size-4 shrink-0 animate-spin text-blue-400"
            strokeWidth={2}
            aria-hidden
          />
          <span className="truncate">Processing and uploading media file...</span>
        </div>
      ) : null}

      <div className="mx-auto flex w-full max-w-full items-end gap-1.5 px-0.5 sm:gap-2 sm:px-1">
        {/* Hidden Native File Input */}
        <input
          ref={mediaInputRef}
          type="file"
          accept="image/*,video/*"
          className="sr-only"
          disabled={isSendingMedia}
          tabIndex={-1}
          aria-hidden
          onChange={handleMediaPick}
        />

        {/* Media Upload Trigger Button */}
        <Button
          variant="ghost"
          isIconOnly
          isDisabled={isSendingMedia}
          aria-label="Upload media"
          className="size-9 shrink-0 touch-manipulation self-end text-blue-400 hover:text-blue-300 transition-colors"
          onPress={() => mediaInputRef.current?.click()}
        >
          <ImageIcon className="size-5 sm:size-6" strokeWidth={2} />
        </Button>

        {/* Text Input Area */}
        <TextArea
          fullWidth
          variant="secondary"
          placeholder="Type a message..."
          rows={1}
          value={composerText}
          onChange={(e) => setComposerText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded-2xl"
        />

        {/* Send Action Button */}
        <Button
          variant="primary"
          isIconOnly
          isDisabled={!composerText.trim() || isSendingMedia}
          aria-label="Send message"
          onPress={handleSend}
          className="size-9 shrink-0 self-end rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 transition-all duration-200 hover:from-blue-500 hover:to-indigo-500 active:scale-95 disabled:opacity-50"
        >
          <SendHorizontalIcon className="size-4.5" />
        </Button>
      </div>
    </footer>
  );
}

export default ChatComposer;