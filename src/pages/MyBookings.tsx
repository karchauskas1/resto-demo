import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon, CalendarIcon, ClockIcon, UsersIcon } from '../components/Icons'
import { restaurants } from '../data/restaurants'

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

  const handleBookClick = () => {
    if (restaurants.length > 0) {
      navigate(`/restaurant/${restaurants[0].id}/booking`)
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
          <>
            <div className="empty-state">
              <div className="empty-state-icon" style={{ display: 'flex', justifyContent: 'center' }}>
                <CalendarIcon />
              </div>
              <p className="empty-state-text">У вас пока нет бронирований</p>
              <button
                onClick={handleBookClick}
                style={{
                  marginTop: 16,
                  padding: '14px 28px',
                  background: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Забронировать столик
              </button>
            </div>

            <div className="info-section" style={{ marginTop: 24, borderRadius: 16 }}>
              <h3 className="info-title">Как работает бронирование</h3>
              <p className="info-text" style={{ marginBottom: 16 }}>
                Здесь ваши клиенты будут видеть все свои бронирования: активные, предстоящие и историю посещений.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: 'var(--primary)', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 600, flexShrink: 0
                  }}>1</div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>Выбор даты и времени</p>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Клиент выбирает удобные дату, время и количество гостей</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: 'var(--primary)', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 600, flexShrink: 0
                  }}>2</div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>Мгновенное подтверждение</p>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Автоматическое подтверждение или модерация администратором</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: 'var(--primary)', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 600, flexShrink: 0
                  }}>3</div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>Напоминания</p>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Push-уведомления за день и за час до визита</p>
                  </div>
                </div>
              </div>
            </div>

            <p style={{
              fontSize: 11,
              color: 'var(--text-secondary)',
              textAlign: 'center',
              marginTop: 16,
              opacity: 0.7
            }}>
              Демо: интеграция с системой бронирования заведения
            </p>
          </>
        ) : (
          <>
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <div className="booking-card-header">
                  <span className="booking-card-restaurant">{booking.restaurantName}</span>
                  <span className={`booking-card-status ${booking.status}`}>
                    {getStatusText(booking.status)}
                  </span>
                </div>
                <div className="booking-card-details">
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <CalendarIcon /> {formatDate(booking.date)}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <ClockIcon /> {booking.time}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <UsersIcon /> {booking.guests} гостей
                  </span>
                </div>
              </div>
            ))}
            <button
              onClick={handleBookClick}
              style={{
                width: '100%',
                marginTop: 16,
                padding: '14px 28px',
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              Забронировать ещё
            </button>
          </>
        )}
      </div>
    </div>
  )
}
