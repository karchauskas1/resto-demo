import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon } from '../components/Icons'

interface BookingData {
  id: string
  restaurantId: string
  restaurantName: string
  date: string
  time: string
  guests: number
  name: string
  phone: string
  comment: string
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: string
}

export default function MyBookings() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState<BookingData[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('bookings')
    if (saved) {
      setBookings(JSON.parse(saved))
    }
  }, [])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Подтверждено'
      case 'pending': return 'Ожидает'
      case 'cancelled': return 'Отменено'
      default: return status
    }
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <button className="profile-back" onClick={() => navigate(-1)}>
          <ChevronLeftIcon />
        </button>
        <span className="profile-title">Мои бронирования</span>
      </div>

      <div className="profile-content">
        {bookings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📅</div>
            <p className="empty-state-text">У вас пока нет бронирований</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <div className="booking-card-header">
                <span className="booking-card-restaurant">{booking.restaurantName}</span>
                <span className={`booking-card-status ${booking.status}`}>
                  {getStatusText(booking.status)}
                </span>
              </div>
              <div className="booking-card-details">
                <span>📅 {formatDate(booking.date)}</span>
                <span>🕐 {booking.time}</span>
                <span>👥 {booking.guests} гостей</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
