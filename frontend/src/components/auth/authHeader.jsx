import React from 'react';
import AppLogo from "../appLogo.jsx"; 
import { ThemePresetPicker } from "../ThemePresetPicker.jsx";
import { ThemeToggle } from "../ThemeToggle.jsx";
import { WallpaperPicker } from "../WallpaperPicker.jsx";

const APP_NAME = "BIZZ";

export function AuthHeader() {
  return (
    // FIXED: Changed from 'sticky' to 'fixed top-0 left-0' with a high z-index
    <header className="fixed top-0 left-0 z-50 flex shrink-0 items-center justify-between gap-4 border-b border-slate-800/60 bg-slate-950/70 px-6 py-3.5 backdrop-blur-md w-full select-none">
      
      {/* Brand & Left Section Wrapper */}
      <div className="flex items-center gap-3">
        <AppLogo 
          appName={APP_NAME} 
          size="sm" 
          animated={false} 
          className="![flex-row] !gap-0 opacity-90 scale-95 origin-left" 
        />

        <div className="flex flex-col">
          {/* <span className="text-base font-black tracking-wider bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-none">
            {APP_NAME}
          </span> */}
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mt-0.5 leading-none">
            Private Session
          </span>
        </div>
      </div>

      {/* Controller Interactive Core Tools */}
      <div className="flex shrink-0 items-center gap-1">
        <WallpaperPicker />
        <ThemePresetPicker />
        <ThemeToggle />
      </div>

    </header>
  );
}

export default AuthHeader;