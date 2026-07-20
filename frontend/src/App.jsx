import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Route, Routes, Navigate } from 'react-router'

// To this:
import { ThemeProvider } from './context/themecontext.jsx'
import { WallpaperProvider } from './context/wallpaperContext.jsx'
import ChatPage from './pages/ChatPage.jsx'
import AuthPage from './pages/AuthPage.jsx'
import AppLogo from './components/AppLogo.jsx'
import './index.css'

function App() {
  const { isLoaded, isSignedIn } = useAuth()
  const [animationDone, setAnimationDone] = useState(false)

  // Step 1: Run the premium cinematic logo reveal for exactly 3.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationDone(true)
    }, 3500) 

    return () => clearTimeout(timer)
  }, [])

  // Step 2: Render the standalone high-end brand intro animation screen first
  if (!animationDone) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-950 text-white overflow-hidden relative select-none">
        {/* Subtle light ambient radial backing glow */}
        <div className="absolute h-[350px] w-[350px] rounded-full bg-blue-600/10 blur-[80px] animate-pulse duration-[3000ms]" />
        
        <div className="flex flex-col items-center gap-6 relative z-10">
          {/* Reusable modular brand component scaled to intro view sizing */}
          <AppLogo size="xl" animated={true} />

          {/* Smooth hardware-accelerated progress loading bar metric */}
          <div className="h-[3px] w-36 bg-slate-900 rounded-full overflow-hidden mt-2 border border-slate-800/40">
            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full animate-[loading-bar_3.2s_ease-in-out_forwards]" />
          </div>
        </div>
      </div>
    )
  }

  // Step 3: Now that brand intro completes, evaluate Clerk session key state
  if (!isLoaded) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-950 text-white gap-4">
        {/* Modern Minimalist Spinner */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-800 border-t-blue-500" />
        
        {/* Soft Breathing Opacity Text */}
        <div className="animate-pulse text-sm font-medium tracking-wide text-slate-400">
          Securing session<span className="animate-bounce inline-block">.</span>
          <span className="animate-bounce inline-block delay-100">.</span>
          <span className="animate-bounce inline-block delay-200">.</span>
        </div>
      </div>
    )
  }

  // Step 4: System verification clear! Pass into global application routers
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
          
          {/* Fallback route context handler to prevent unmapped routing blank frames */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ThemeProvider>
    </WallpaperProvider>
  )
}

export default App