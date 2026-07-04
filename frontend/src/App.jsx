import './App.css'
// 1. Import useAuth instead of the missing components
import { useAuth, SignInButton, SignUpButton, UserButton } from '@clerk/react'

function App() {
  // 2. Grab the current loading status and sign-in status
  const { isLoaded, isSignedIn } = useAuth()

  // 3. Prevent rendering or crashing while Clerk determines if the user is logged in
  if (!isLoaded) {
    return <div className="loading">Loading...</div>
  }

  return (
    <>
      <header>
        {/* 4. If NOT signed in, show the login/signup buttons */}
        {!isSignedIn && (
          <>
            <SignInButton mode='modal' />
            <SignUpButton mode='modal' />
          </>
        )}

        {/* 5. If fully signed in, show the User profile button */}
        {isSignedIn && (
          <UserButton />
        )}
      </header>
    </>
  )
}

export default App