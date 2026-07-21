import React from "react";
import { Avatar, Button } from "@heroui/react";
import {
  ChevronLeftIcon,
  Volume2Icon,
  VolumeXIcon,
  XIcon,
  Maximize2Icon,
  Minimize2Icon,
} from "lucide-react";
import { AvatarWithOnlineIndicator } from "./AvatarWithOnlineIndicator.jsx";

import { ThemePresetPicker } from "../ThemePresetPicker.jsx";
import { ThemeToggle } from "../ThemeToggle.jsx";
import { WallpaperPicker } from "../WallpaperPicker.jsx";

import { useChatStore } from "../../store/userChatStore.js";
import { useSelectedConversation } from "../../hooks/useSelectedConversation.js";

export function ChatHeader({ isMaximized, onToggleMaximize }) {
  const isSoundEnabled = useChatStore((state) => state.isSoundEnabled);
  const setActiveConversationId = useChatStore((state) => state.setActiveConversationId);
  const setSoundEnabled = useChatStore((state) => state.setSoundEnabled);

  const { activeConversation, isLargeScreen } = useSelectedConversation();

  return (
    <header className="sticky top-0 z-10 flex shrink-0 flex-wrap items-center gap-1 border-b border-border bg-background/80 backdrop-blur-md px-2 py-2 sm:gap-2 sm:px-4 select-none min-h-[57px]">
      {/* Mobile Back Button */}
      {activeConversation && !isLargeScreen ? (
        <Button
          variant="ghost"
          size="sm"
          isIconOnly
          className="shrink-0"
          onPress={() => setActiveConversationId(null)}
        >
          <ChevronLeftIcon className="size-6" strokeWidth={2.25} />
        </Button>
      ) : null}

      {/* Active Conversation Profile Header */}
      {activeConversation ? (
        <>
          <AvatarWithOnlineIndicator isOnline={activeConversation.peer.isOnline ?? true}>
            <Avatar className="size-9 shrink-0">
              <Avatar.Image
                alt={activeConversation.peer.name}
                src={activeConversation.peer.avatarUrl}
              />
              <Avatar.Fallback className="text-sm font-medium">
                {activeConversation.peer.initials}
              </Avatar.Fallback>
            </Avatar>
          </AvatarWithOnlineIndicator>

          <div className="flex-1 text-left">
            <p className="truncate text-[15px] font-semibold leading-tight">
              {activeConversation.peer.name}
            </p>
            <p className="truncate text-xs text-muted">
              {activeConversation.peer.isOnline ? (
                <span className="font-medium text-emerald-500">Online</span>
              ) : (
                "Offline"
              )}
            </p>
          </div>
        </>
      ) : (
        /* Workspace Header Title */
        <div className="flex flex-1 flex-col justify-center text-left px-1">
          <p className="truncate text-base font-bold tracking-tight text-foreground">
            BIZZ Workspace
          </p>
          <p className="truncate text-xs text-slate-400">
            Select a conversation to start chatting
          </p>
        </div>
      )}

      {/* Right Tool Controls */}
      <div className="ml-auto flex max-w-full shrink-0 flex-wrap items-center justify-end gap-0.5 sm:gap-1">
        <div className="hidden min-[400px]:contents">
          <WallpaperPicker />
          <ThemePresetPicker />
        </div>

        <ThemeToggle />

        {/* Audio Notification Switcher */}
        <Button
          variant="ghost"
          size="sm"
          isIconOnly
          className="shrink-0"
          aria-pressed={isSoundEnabled}
          onPress={() => setSoundEnabled(!isSoundEnabled)}
        >
          {isSoundEnabled ? (
            <Volume2Icon className="size-5" strokeWidth={2} aria-hidden />
          ) : (
            <VolumeXIcon className="size-5 opacity-60" strokeWidth={2} aria-hidden />
          )}
        </Button>

        {/* Desktop-Only Maximize/Minimize Fullscreen Toggle */}
        <Button
          variant="ghost"
          size="sm"
          isIconOnly
          aria-label={isMaximized ? "Restore window" : "Maximize window"}
          className="hidden md:flex shrink-0 text-slate-400 hover:text-white transition-colors"
          onPress={onToggleMaximize}
        >
          {isMaximized ? (
            <Minimize2Icon className="size-5" strokeWidth={2} aria-hidden />
          ) : (
            <Maximize2Icon className="size-5" strokeWidth={2} aria-hidden />
          )}
        </Button>

        {/* Close Active Chat Button */}
        {activeConversation ? (
          <Button
            variant="ghost"
            size="sm"
            isIconOnly
            className="shrink-0"
            aria-label="Close chat"
            onPress={() => setActiveConversationId(null)}
          >
            <XIcon className="size-5 opacity-80" strokeWidth={2} aria-hidden />
          </Button>
        ) : null}
      </div>
    </header>
  );
}

export default ChatHeader;