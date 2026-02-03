import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeftIcon, MinusIcon, PlusIcon } from '../components/Icons'
import { restaurants } from '../data/restaurants'

export default function Booking() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const restaurant = restaurants.find(r => r.id === id)

  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [guests, setGuests] = useState(2)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState(() => localStorage.getItem('userPhone') || '')
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  if (!restaurant) {
    return (
      <div className="profile-page">
        <div className="profile-header">
          <button className="profile-back" onClick={() => navigate(-1)}>
            <ChevronLeftIcon />
          </button>
          <span className="profile-title">Ресторан не найден</span>
        </div>
      </div>
    )
  }

  const timeSlots = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
    '21:00', '21:30', '22:00'
  ]

  const handleSubmit = async () => {
    if (!date || !time || !name || !phone) {
      alert('Пожалуйста, заполните все обязательные поля')
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Save booking to localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    const newBooking = {
      id: Date.now().toString(),
      restaurantId: id,
      restaurantName: restaurant.name,
      date,
      time,
      guests,
      name,
      phone,
      comment,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    bookings.push(newBooking)
    localStorage.setItem('bookings', JSON.stringify(bookings))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Haptic feedback
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.hapticFeedback.notificationOccurred('success')
    }
  }

  if (isSuccess) {
    return (
      <div className="profile-page">
        <div className="profile-header">
          <button className="profile-back" onClick={() => navigate('/')}>
            <ChevronLeftIcon />
          </button>
          <span className="profile-title">Бронирование</span>
        </div>
        <div className="empty-state">
          <div className="empty-state-icon">✅</div>
          <h2 style={{ marginBottom: 8 }}>Заявка отправлена!</h2>
          <p className="empty-state-text">
            Мы свяжемся с вами для подтверждения бронирования
          </p>
          <button
            className="onboarding-button"
            style={{ marginTop: 24, maxWidth: 280 }}
            onClick={() => navigate('/my-bookings')}
          >
            Мои бронирования
          </button>
          <button
            className="onboarding-skip"
            onClick={() => navigate('/')}
          >
            На главную
          </button>
        </div>
      </div>
    )
  }

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '')
    if (digits.length <= 1) return digits ? `+${digits}` : ''
    if (digits.length <= 4) return `+${digits.slice(0, 1)} (${digits.slice(1)}`
    if (digits.length <= 7) return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}) ${digits.slice(4)}`
    if (digits.length <= 9) return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
    return `+${digits.slice(0, 1)} (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <button className="profile-back" onClick={() => navigate(-1)}>
          <ChevronLeftIcon />
        </button>
        <span className="profile-title">Бронирование</span>
      </div>

      <div className="booking-form">
        <h2 className="booking-title">{restaurant.name}</h2>

        <div className="form-group">
          <label className="form-label">Дата *</label>
          <input
            type="date"
            className="form-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Время *</label>
          <select
            className="form-input"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="">Выберите время</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Количество гостей</label>
          <div className="guests-selector">
            <button
              className="guests-btn"
              onClick={() => setGuests(Math.max(1, guests - 1))}
            >
              <MinusIcon />
            </button>
            <span className="guests-count">{guests}</span>
            <button
              className="guests-btn"
              onClick={() => setGuests(Math.min(20, guests + 1))}
            >
              <PlusIcon />
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Ваше имя *</label>
          <input
            type="text"
            className="form-input"
            placeholder="Как к вам обращаться"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Телефон *</label>
          <input
            type="tel"
            className="form-input"
            placeholder="+7 (___) ___-__-__"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Комментарий</label>
          <textarea
            className="form-input"
            placeholder="Особые пожелания, аллергии..."
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ resize: 'none' }}
          />
        </div>
      </div>

      {/* Main Button */}
      <div className="main-button">
        <button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <div className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} />
          ) : (
            'Забронировать'
          )}
        </button>
      </div>
    </div>
  )
}
