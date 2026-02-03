import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Onboarding from './pages/Onboarding'
import MainScreen from './pages/MainScreen'
import RestaurantDetail from './pages/RestaurantDetail'
import MyBookings from './pages/MyBookings'
import MyTickets from './pages/MyTickets'
import MyOrders from './pages/MyOrders'
import Certificates from './pages/Certificates'
import Notifications from './pages/Notifications'
import PersonalData from './pages/PersonalData'
import Booking from './pages/Booking'
import Sidebar from './components/Sidebar'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isOnboarded, setIsOnboarded] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Initialize Telegram WebApp
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready()
      window.Telegram.WebApp.expand()
    }

    // Check if user has completed onboarding
    const onboarded = localStorage.getItem('onboarded')
    if (onboarded === 'true') {
      setIsOnboarded(true)
    }
  }, [])

  const completeOnboarding = () => {
    localStorage.setItem('onboarded', 'true')
    setIsOnboarded(true)
    navigate('/')
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  // Don't show sidebar on certain pages
  const showSidebar = !location.pathname.includes('/onboarding')

  if (!isOnboarded) {
    return <Onboarding onComplete={completeOnboarding} />
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainScreen onMenuClick={toggleSidebar} />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        <Route path="/restaurant/:id/booking" element={<Booking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/personal-data" element={<PersonalData />} />
      </Routes>
      {showSidebar && (
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      )}
    </div>
  )
}

export default App
