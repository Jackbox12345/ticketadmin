import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './pages/Dashboard'
import Card from "./component/ui/Cards";
import { SocketProvider } from "./context/SocketContext";
function App() {
  

  return (
    <>
    {/* <SocketProvider>
      
    </SocketProvider> */}
    <Dashboard/>
    </>
  )
}

export default App
