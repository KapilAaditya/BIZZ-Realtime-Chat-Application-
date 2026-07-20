import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from "react-router"

// Fetch the key from Vite's env environment
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// Safety check to tell you immediately if Vite can't read the file
if (!PUBLISHABLE_KEY) {
  console.error("Clerk Key Error: VITE_CLERK_PUBLISHABLE_KEY is undefined. Check your .env file placement!")
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)

/*onst { isLoaded, isSignedIn } = useAuth()
  const [animationDone, setAnimationDone] = useState(false)

  // Step 1: Force the brand word animation to run for exactly 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationDone(true)
    }, 5000) // 5000ms ensures the 1.5s typing animation executes completely first

    return () => clearTimeout(timer)
  }, [])

  // Step 2: Show the brand loading screen until the words finish typing
  if (!animationDone) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-2xl font-semibold tracking-wide">
          Loading <span className="bizz-loader text-blue-500 font-bold">Bizz</span>
        </div>
      </div>
    )
  }

  // Step 3: Now that Bizz is loaded, evaluate Clerk's session payload
  if (!isLoaded) {
    return <div className="loading">Loading App Session...</div>
  }

  const redirectUrl = window.location.origin;
 */