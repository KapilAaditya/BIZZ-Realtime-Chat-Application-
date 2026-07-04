import './App.css'
import { useAuth, SignInButton, SignUpButton, UserButton } from '@clerk/react'

function App() {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return <div className="loading">Loading...</div>
  }

  // Force Clerk to return back to your root homepage after finishing the form
  const redirectUrl = window.location.origin;

  return (
    <>
      <header>
        {!isSignedIn && (
          <>
            <SignInButton mode='modal' forceRedirectUrl={redirectUrl} />
            <SignUpButton mode='modal' forceRedirectUrl={redirectUrl} />
          </>
        )}

        {isSignedIn && (
          <UserButton />
        )}
      </header>
    </>
  )
}

export default App