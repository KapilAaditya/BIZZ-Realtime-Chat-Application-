import { SignIn, SignUp } from '@clerk/clerk-react'
import { useState } from 'react'
import { useWallpaper } from "../context/wallpaper.js"
import { ShieldCheck, Sparkles, KeyRound } from "lucide-react" // Added layout decorative icons
import AuthHeader from '../components/auth/authHeader.jsx'
import { AuthHeroPanel } from '../components/auth/AuthHeroPanel.jsx'

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showClerk, setShowClerk] = useState(false) // State to check if continue has been pressed
  const { frameStyle } = useWallpaper()

  const clerkAppearance = {
    elements: {
      card: 'bg-slate-900 border border-slate-800 shadow-2xl rounded-2xl transition-all duration-300 hover:border-slate-700/80',
      headerTitle: 'text-white font-bold tracking-tight',
      headerSubtitle: 'text-slate-400',
      socialButtonsBlockButton: 'bg-slate-800 text-white border-slate-700 transition-all duration-200 hover:bg-slate-700 hover:border-slate-500 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
      socialButtonsBlockButtonText: 'text-white font-medium',
      dividerLine: 'bg-slate-800',
      dividerText: 'text-slate-500 text-xs uppercase tracking-wider',
      formFieldLabel: 'text-slate-300 font-medium text-sm transition-colors duration-200 group-hover:text-blue-400',
      formFieldInput: 'bg-slate-950 border-slate-800 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg transition-all duration-200 hover:border-slate-700',
      formButtonPrimary: 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 normal-case',
      footerActionText: 'text-slate-400',
      footerActionLink: 'text-blue-400 hover:text-blue-300 font-medium relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-blue-400 after:transition-all hover:after:w-full duration-200',
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white font-sans antialiased overflow-hidden relative" style={frameStyle}>
      {/* Background Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-slate-950/80 backdrop-blur-sm z-0 pointer-events-none" />

      {/* Floating System Header */}
      <div className="absolute top-0 left-0 w-full z-30 pointer-events-none">
        <div className="pointer-events-auto">
          <AuthHeader />
        </div>
      </div>

      {/* LEFT COLUMN: Premium Brand Sidebar */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-y-auto bg-slate-900 p-12 pt-28 lg:flex border-r border-slate-800/60 group/sidebar z-10 h-screen scrollbar-none">
        {/* Interactive glow effect */}
        <div className="absolute top-[-20%] right-[-20%] h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[120px] transition-all duration-700 group-hover/sidebar:bg-blue-600/10 group-hover/sidebar:scale-110" />

        {/* Upper Layout Stack (Logo -> Custom Panels) */}
        <div className="space-y-8 relative z-10 w-full">

          {/* Logo & Status Badge Row */}
          <div className="flex items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-2.5 group/logo cursor-pointer">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-lg font-black tracking-tighter text-white shadow-md shadow-blue-500/20 transition-transform duration-500 ease-out group-hover/logo:rotate-[360deg] group-hover/logo:scale-105">
                B
              </div>
              <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                BIZZ
              </span>
            </div>

            {/* Live Engine Status Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1 text-[11px] font-medium text-blue-400 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/40 hover:bg-blue-500/10 cursor-default">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
              </span>
              Websockets Active
            </div>
          </div>

          {/* FIXED: Panels sit perfectly grouped directly under the logo element */}
          <div className="flex flex-col gap-4 w-full max-w-2xl pt-2">
            <AuthHeroPanel />
            {/* <AuthActionPanel /> */}
          </div>

          {/* Interactive Feature Mini Cards */}
          {/* <div className="pt-4 space-y-2.5 max-w-md">
            <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-800/60 bg-slate-950/30 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/50 hover:bg-slate-800/30 hover:translate-x-1 cursor-default">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              <span className="text-xs font-medium text-slate-400">End-to-End State Hooks Encryption</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-800/60 bg-slate-950/30 backdrop-blur-sm transition-all duration-300 hover:border-slate-700/50 hover:bg-slate-800/30 hover:translate-x-1 cursor-default">
              <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              <span className="text-xs font-medium text-slate-400">Adaptive CSS Wallpaper Context Engines</span>
            </div>
          </div> */}

        </div>

        {/* Footer info text */}
        <div className="text-xs text-slate-500 relative z-10 font-medium pt-8">
          &copy; {new Date().getFullYear()} BIZZ Engine Inc. All rights reserved.
        </div>
      </div>

      {/* RIGHT COLUMN: Sign In / Sign Up Module Context */}
      <div className="flex w-full flex-col justify-center px-4 sm:px-6 lg:w-1/2 lg:px-8 relative bg-slate-950/40 backdrop-blur-xs z-10 pt-28 h-screen overflow-y-auto scrollbar-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

        <div className="mx-auto w-full max-w-md flex flex-col items-center justify-center min-h-[600px]">
          
          {!showClerk ? (
            /* STEP 1: Elegant Intro Card Layer */
            <div className="w-full bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl flex flex-col items-stretch text-center transition-all duration-300 animate-in fade-in zoom-in-95">
              <div className="mx-auto h-12 w-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 mb-6">
                <KeyRound className="size-5" />
              </div>
              
              <div className="flex items-center justify-center gap-1.5 text-blue-400 mb-2">
                <Sparkles className="size-3.5" strokeWidth={2.5} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Session Access Protocol</span>
              </div>

              <h3 className="text-xl font-extrabold tracking-tight text-white mb-3">
                Identity Verification
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-8 max-w-xs mx-auto">
                Chat with confidence. All your conversations are encrypted and secure.
              </p>

              <button
                onClick={() => setShowClerk(true)}
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 text-xs font-bold uppercase tracking-wider text-white rounded-xl shadow-lg shadow-blue-500/10 transition-all duration-200 active:scale-[0.98] cursor-pointer flex items-center justify-center"
              >
                <span>Continue to Sign In / Sign Up</span>
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 border-t border-slate-800/60 pt-4 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                <ShieldCheck className="size-4 text-emerald-500" strokeWidth={2.5} />
                <span>Encrypted Tunnel Connection</span>
              </div>
            </div>
          ) : (
            /* STEP 2: Smooth Clerk Component Mounting Box Container */
            <div className="w-full flex flex-col items-center transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
              <div className="w-full flex justify-center min-h-[515px]">
                {isSignUp ? (
                  <SignUp signInUrl="/auth" forceRedirectUrl="/" appearance={clerkAppearance} />
                ) : (
                  <SignIn signUpUrl="/auth" forceRedirectUrl="/" appearance={clerkAppearance} />
                )}
              </div>

              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="mt-6 text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer group/toggle py-1 px-3 rounded-lg hover:bg-slate-900/40"
              >
                {isSignUp ? (
                  <span>Already registered? <strong className="text-blue-400 transition-colors group-hover/toggle:text-blue-300 underline underline-offset-4 decoration-transparent group-hover/toggle:decoration-blue-300">Sign In Instead</strong></span>
                ) : (
                  <span>New to the system? <strong className="text-blue-400 transition-colors group-hover/toggle:text-blue-300 underline underline-offset-4 decoration-transparent group-hover/toggle:decoration-blue-300">Create an Account</strong></span>
                )}
              </button>
              
              {/* Back navigation option */}
              <button 
                onClick={() => setShowClerk(false)}
                className="mt-3 text-[11px] font-bold text-slate-500 hover:text-slate-400 uppercase tracking-widest transition-colors cursor-pointer"
              >
                ← Return to checkpoint info
              </button>
            </div>
          )}
          
        </div>
      </div>
    </div>
  )
}

export default AuthPage