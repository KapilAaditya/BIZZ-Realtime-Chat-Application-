import React from 'react';
import { AuthHeroPattern } from "./AuthHeroPattern";

const APP_NAME = "BIZZ";

const heroPanelClassName = [
  "relative flex shrink-0 flex-col overflow-hidden rounded-2xl w-full",
  "bg-slate-950/20 border border-slate-800/60 backdrop-blur-sm shadow-2xl shadow-black/20",
].join(" ");

const heroImageClassName = [
  "h-auto max-h-[280px] md:max-h-[320px] w-auto drop-shadow-[0_25px_25px_rgba(0,0,0,0.4)]",
  "animate-[auth-float-y_5s_ease-in-out_infinite]",
  "object-contain object-center select-none motion-reduce:animate-none",
].join(" ");

export function AuthHeroPanel() {
  return (
    <section className={heroPanelClassName}>
      <AuthHeroPattern />

      {/* Expanded horizontal padding and max-width metrics */}
      <div className="relative z-10 flex flex-col p-8 md:p-12 w-full justify-between min-h-[520px] max-w-2xl mx-auto">

        {/* Expanded Typography Block */}
        <div className="text-left space-y-3.5">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-blue-400">
            Secure Gateway Engine
          </p>
          <h2 className="text-balance text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
            Open {APP_NAME}
          </h2>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed tracking-wide max-w-xl">
            Chat Smarter. Connect Faster.
            Experience lightning-fast, private conversations with a modern messaging experience.
          </p>
        </div>

        {/* Grand Hero Art Display Stage */}
        <div className="flex flex-1 items-center justify-center py-10">
          <img
            src="/auth.png"
            alt="BIZZ Security Verification"
            width={580}
            height={580}
            className={heroImageClassName}
            draggable={false}
            decoding="async"
          />
        </div>

        {/* Security Footer Note */}
        <p className="text-left text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 border-t border-slate-800/40 pt-4 mt-2 w-full">
          End-to-End Encryption · Secure Tunnel Active
        </p>
      </div>
    </section>
  );
}