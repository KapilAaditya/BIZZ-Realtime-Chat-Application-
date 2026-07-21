import React, { useState } from "react";
import { isImageKitUrl, withTransform } from "../../lib/imagekit";
import { FilmIcon, PlayIcon } from "lucide-react";

// ImageKit URL Transformation parameters
const VIDEO_TRANSFORM = "q-80,w-640";
const POSTER_TRANSFORM = "q-80,w-640";

/** ImageKit extracts poster frames by appending `/ik-thumbnail.jpg`. */
function buildPosterUrl(url) {
  if (!url || !isImageKitUrl(url)) return undefined;
  const [path] = url.split("?");
  return withTransform(`${path}/ik-thumbnail.jpg`, POSTER_TRANSFORM);
}

/** ImageKit-optimized chat video component with error fallback & UI polish. */
export function MessageVideo({ src }) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (!src) return null;

  const optimizedSrc = isImageKitUrl(src) ? withTransform(src, VIDEO_TRANSFORM) : src;
  const posterSrc = buildPosterUrl(src);

  // Fallback UI if video URL fails to resolve or load
  if (hasError) {
    return (
      <div className="mb-1.5 flex h-36 w-64 flex-col items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-center text-xs text-slate-400 backdrop-blur-md">
        <FilmIcon className="h-6 w-6 text-slate-500" strokeWidth={1.5} />
        <span>Unable to play video</span>
      </div>
    );
  }

  return (
    <div className="relative mb-1.5 max-h-52 max-w-full overflow-hidden rounded-lg bg-slate-950/40 sm:max-h-64 sm:rounded-xl">
      {/* Skeleton / Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs">
          <PlayIcon className="h-8 w-8 animate-pulse text-blue-400/70" />
        </div>
      )}

      <video
        src={optimizedSrc}
        poster={posterSrc}
        controls
        playsInline
        preload="metadata"
        onLoadedData={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`max-h-52 max-w-full rounded-lg object-contain transition-opacity duration-300 sm:max-h-64 sm:rounded-xl ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export default MessageVideo;