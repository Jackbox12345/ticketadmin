import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './pages/Dashboard'
import Card from "./component/ui/Cards";

function App() {
  

  return (
    <>
    <Dashboard/>
      <div className="min-h-screen bg-[var(--bg)] p-8 space-y-6">
      <Card>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          Default Card
        </h2>
        <p className="text-[var(--text-secondary)]">
          This is a reusable card component.
        </p>
      </Card>

      <Card variant="surface" padding="lg">
        Surface variant with larger padding
      </Card>
    </div>
    </>
  )
}

export default App
