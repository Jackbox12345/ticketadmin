import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './pages/Dashboard'
import TrendAnalytics from './pages/TrendAnalytics'
// import Card from "./component/ui/Cards";
// import { SocketProvider } from "./context/SocketContext";
import { DashboardProvider } from './context/DashboardContext'
function App() {
  const [route, setRoute] = useState(window.location.hash)

  useEffect(() => {
    const handleRouteChange = () => setRoute(window.location.hash)

    window.addEventListener('hashchange', handleRouteChange)
    return () => window.removeEventListener('hashchange', handleRouteChange)
  }, [])

  if (route === '#/resolver-analytics') {
    return <TrendAnalytics />
  }

  return (
    <>
    {/* <SocketProvider>
      
    </SocketProvider> */}
    <DashboardProvider>
      <Dashboard/>
    </DashboardProvider>
    
    </>
  )
}

export default App
