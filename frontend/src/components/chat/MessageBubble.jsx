import React from "react";
import { withTransform } from "../../lib/imagekit";
import { MessageVideo } from "./MessageVideo";

// Compress + size images for the bubble (q-auto works for images; f-auto picks WebP/AVIF).
const IMAGE_TRANSFORM = "q-auto,w-640,f-auto";

export function MessageBubble({ message }) {
  // Support both 'role === "me"' or 'isOwnMessage' flag if present
  const isOwnMessage = message.role === "me" || message.senderId === "me" || message.isOwn;
  const hasImage = Boolean(message.imageUrl);
  const hasVideo = Boolean(message.videoUrl);

  return (
    <div className={`flex w-full ${isOwnMessage ? "justify-end" : "justify-start"} my-1`}>
      <div
        className={`group relative max-w-[min(88%,28rem)] rounded-2xl px-3.5 py-2.5 text-[14px] sm:text-[15px] leading-relaxed shadow-sm transition-all duration-150 sm:max-w-[min(75%,28rem)] ${
          isOwnMessage
            ? "rounded-tr-xs bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/10"
            : "rounded-tl-xs border border-slate-800/80 bg-slate-900/90 text-slate-100 backdrop-blur-md"
        }`}
      >
        {/* Render Image Attachment */}
        {hasImage ? (
          <div className="overflow-hidden rounded-xl mb-1.5 bg-slate-950/30">
            <img
              src={withTransform(message.imageUrl, IMAGE_TRANSFORM)}
              alt="Shared attachment"
              loading="lazy"
              className="max-h-52 w-full object-cover transition-transform duration-300 hover:scale-[1.01]"
            />
          </div>
        ) : null}

        {/* Render Video Attachment */}
        {hasVideo ? <MessageVideo src={message.videoUrl} /> : null}

        {/* Text Message Content */}
        {message.text ? (
          <p className="whitespace-pre-wrap break-words">{message.text}</p>
        ) : null}

        {/* Timestamp & Status Footer */}
        <div
          className={`mt-1 flex items-center justify-end gap-1 text-[10px] tabular-nums ${
            isOwnMessage ? "text-blue-100/70" : "text-slate-400"
          }`}
        >
          <span>{message.time || message.createdAt}</span>
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;