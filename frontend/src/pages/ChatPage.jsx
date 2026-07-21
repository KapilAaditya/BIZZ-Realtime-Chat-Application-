import React, { useEffect, useState } from "react";
import { useWallpaper } from "../context/wallpaper.js";
import { useChatStore } from "../store/userChatStore.js";
import { useSelectedConversation } from "../hooks/useSelectedConversation.js";

// Component Imports
import ChatSidebar from "../components/chat/ChatSidebar.jsx";
import { ChatHeader } from "../components/chat/ChatHeader.jsx";
import { MessageList } from "../components/chat/MessageList.jsx";
import { ChatComposer } from "../components/chat/ChatComposer.jsx";

function ChatPage() {
  const { frameStyle } = useWallpaper();
  const [isMaximized, setIsMaximized] = useState(false);

  const getConversations = useChatStore((state) => state.getConversations);
  const getMessages = useChatStore((state) => state.getMessages);
  const getUsers = useChatStore((state) => state.getUsers);
  const subscribeToMessages = useChatStore((state) => state.subscribeToMessages);
  const unsubscribeFromMessages = useChatStore((state) => state.unsubscribeFromMessages);

  const { activeConversation, activeConversationId, isLargeScreen } = useSelectedConversation();

  useEffect(() => {
    getUsers();
    getConversations();
  }, [getConversations, getUsers]);

  useEffect(() => {
    if (!activeConversationId) return;

    getMessages(activeConversationId);
    subscribeToMessages(activeConversationId);

    // cleanup
    return () => unsubscribeFromMessages();
  }, [getMessages, activeConversationId, subscribeToMessages, unsubscribeFromMessages]);

  return (
    <div
      className={`flex h-dvh flex-col overflow-hidden transition-all duration-300 ${
        isMaximized ? "p-0" : "p-2 sm:p-3 md:p-8"
      }`}
      style={frameStyle}
    >
      <div
        className={`mx-auto flex w-full flex-1 overflow-hidden transition-all duration-300 ${
          isMaximized
            ? "max-w-full rounded-none border-0"
            : "max-w-6xl rounded-2xl border border-border bg-background text-foreground"
        }`}
      >
        {/* Left Sidebar */}
        <ChatSidebar />

        {/* Active Chat Area */}
        <div
          className={`flex-1 flex-col overflow-hidden ${
            !isLargeScreen && !activeConversationId ? "hidden lg:flex" : "flex"
          }`}
        >
          <ChatHeader
            isMaximized={isMaximized}
            onToggleMaximize={() => setIsMaximized((prev) => !prev)}
          />
          <MessageList />

          {activeConversation ? <ChatComposer /> : null}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;