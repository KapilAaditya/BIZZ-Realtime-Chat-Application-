import './index.css'
import { ThemeProvider } from './coontext/themecontext.jsx'
import { WallpaperProvider } from './coontext/wallpaperContext.jsx'
import { Navigate, Route, Routes } from 'react-router'
import ChatPage from './pages/ChatPage.jsx' // Ensure this matches your filename!
import AuthPage from './pages/AuthPage.jsx'
import { useAuth } from '@clerk/clerk-react'

function App() {
  const { isLoaded, isSignedIn } = useAuth()
  if (!isLoaded) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-slate-950 text-white gap-4">
      {/* Sleek Minimalist Spinner */}
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-800 border-t-blue-500" />
      
      {/* Soft Pulsing Subtext */}
      <div className="animate-pulse text-sm font-medium tracking-wide text-slate-400">
        Loading session<span className="animate-bounce inline-block delay-100">.</span>
        <span className="animate-bounce inline-block delay-200">.</span>
        <span className="animate-bounce inline-block delay-300">.</span>
      </div>
    </div>
  )
}
  return (
    <WallpaperProvider>
      <ThemeProvider>
        <Routes>
          {/* Now rendering at the root URL (http://localhost:5173/) */}
          <Route path="/" element={isSignedIn ?<ChatPage />: <Navigate to={"/auth"} replace />} />
          <Route path="/auth" element={!isSignedIn ?<AuthPage /> : <Navigate to={"/"} replace />} />
        </Routes>
      </ThemeProvider>
    </WallpaperProvider>
  )
}

export default App