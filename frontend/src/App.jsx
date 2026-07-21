import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Route, Routes, Navigate } from 'react-router'

import { ThemeProvider } from './context/themecontext.jsx'
import { WallpaperProvider } from './context/wallpaperContext.jsx'
import ChatPage from './pages/ChatPage.jsx'
import AuthPage from './pages/AuthPage.jsx'
import AppLogo from './components/appLogo.jsx'
import './index.css'
import { useAuthStore } from './store/useAuthStore.js'
import { Toaster } from 'react-hot-toast'

function App() {
  const { isLoaded, isSignedIn } = useAuth()
  const [animationDone, setAnimationDone] = useState(false)

  // FIXED: Corrected arrow function implicit returns for Zustand store selectors
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const checkAuth = useAuthStore((state) => state.checkAuth) // Cleaned up 'checkAuthAuth' typo
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth)

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      if (checkAuth) checkAuth();
    } else {
      if (clearAuth) clearAuth();
    }
  }, [checkAuth, clearAuth, isLoaded, isSignedIn])

  // Step 1: Run the cinematic logo reveal for 3.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationDone(true)
    }, 3500) 

    return () => clearTimeout(timer)
  }, [])

  // Step 2: Render the standalone brand intro animation screen first
  if (!animationDone) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-950 text-white overflow-hidden relative select-none">
        {/* Ambient backing glow */}
        <div className="absolute h-[350px] w-[350px] rounded-full bg-blue-600/10 blur-[80px] animate-pulse duration-[3000ms]" />
        
        <div className="flex flex-col items-center gap-6 relative z-10">
          <AppLogo size="xl" animated={true} />

          {/* Progress loading bar */}
          <div className="h-[3px] w-36 bg-slate-900 rounded-full overflow-hidden mt-2 border border-slate-800/40">
            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full animate-[loading-bar_3.2s_ease-in-out_forwards]" />
          </div>
        </div>
      </div>
    )
  }

  // Step 3: Evaluate Clerk session key state
  if (!isLoaded || (isSignedIn && isCheckingAuth)) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-950 text-white gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-800 border-t-blue-500" />
        
        <div className="animate-pulse text-sm font-medium tracking-wide text-slate-400">
          Securing session<span className="animate-bounce inline-block">.</span>
          <span className="animate-bounce inline-block delay-100">.</span>
          <span className="animate-bounce inline-block delay-200">.</span>
        </div>
      </div>
    )
  }

  // Step 4: Pass into global application routers
  return (
    <WallpaperProvider>
      <ThemeProvider>
        <Routes>
          {/* Base Root Layout Router Path */}
          <Route 
            path="/" 
            element={isSignedIn ? <ChatPage /> : <Navigate to="/auth" replace />} 
          />
          
          {/* Unauthenticated Security Auth Layout Route */}
          <Route 
            path="/auth" 
            element={!isSignedIn ? <AuthPage /> : <Navigate to="/" replace />} 
          />
          
          {/* Fallback route handler */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </ThemeProvider>
    </WallpaperProvider>
  )
}

export default App