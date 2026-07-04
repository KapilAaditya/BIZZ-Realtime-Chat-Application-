import './App.css'
// 1. Import the correct control components from Clerk
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/react'

function App() {
  return (
    <>
      <header>
        {/* 2. Rendered only when the user is completely logged out */}
        <SignedOut>
          <SignInButton mode='modal' />
          <SignUpButton mode='modal' />
        </SignedOut>

        {/* 3. Rendered only when the user is completely logged in */}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </>
  )
}

export default App