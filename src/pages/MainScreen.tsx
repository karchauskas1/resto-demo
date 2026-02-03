import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MenuIcon, ChevronDownIcon, CalendarIcon, UtensilsIcon, GiftIcon, UsersIcon, XIcon, CheckIcon, PhoneIcon } from '../components/Icons'
import { restaurants, events, cities } from '../data/restaurants'

interface MainScreenProps {
  onMenuClick: () => void
}

interface Event {
  id: string
  title: string
  image: string
  date: string
  restaurantId: string
  price: number
  description: string
}

export default function MainScreen({ onMenuClick }: MainScreenProps) {
  const [selectedCity, setSelectedCity] = useState('Москва')
  const [showCityModal, setShowCityModal] = useState(false)
  const [showEventModal, setShowEventModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showBanquetModal, setShowBanquetModal] = useState(false)
  const navigate = useNavigate()

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
    setShowEventModal(true)
  }

  const formatEventDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const filteredRestaurants = restaurants.filter(r => r.city === selectedCity)

  return (
    <div className="main-screen">
      {/* Header */}
      <header className="header">
        <div style={{ width: 40 }} />
        <div className="header-logo">
          <span className="header-logo-text">RESTO</span>
          <span className="header-logo-subtext">DEMO</span>
        </div>
        <button className="header-menu" onClick={onMenuClick}>
          <MenuIcon />
        </button>
      </header>

      {/* Featured Events / Highlights */}
      <section className="featured-events">
        <div className="demo-hint" style={{
          padding: '8px 16px',
          fontSize: 11,
          color: 'var(--text-secondary)',
          opacity: 0.7,
          textAlign: 'center'
        }}>
          Здесь заведение может размещать свои хайлайты и акции
        </div>
        <div className="featured-events-scroll">
          {events.map((event) => (
            <div
              key={event.id}
              className="featured-event-card"
              onClick={() => handleEventClick(event)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={event.image}
                alt={event.title}
                className="featured-event-image"
              />
              <span className="featured-event-title">{event.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <button className="quick-action" onClick={() => navigate('/my-bookings')}>
          <div className="quick-action-icon">
            <CalendarIcon />
          </div>
          <span className="quick-action-label">Бронирования</span>
        </button>
        <button className="quick-action" onClick={() => navigate('/my-tickets')}>
          <div className="quick-action-icon">
            <UtensilsIcon />
          </div>
          <span className="quick-action-label">Мероприятия</span>
        </button>
        <button className="quick-action" onClick={() => navigate('/certificates')}>
          <div className="quick-action-icon">
            <GiftIcon />
          </div>
          <span className="quick-action-label">Сертификаты</span>
        </button>
        <button className="quick-action" onClick={() => setShowBanquetModal(true)}>
          <div className="quick-action-icon">
            <UsersIcon />
          </div>
          <span className="quick-action-label">Банкеты</span>
        </button>
      </section>

      {/* City Selector */}
      <button className="city-selector" onClick={() => setShowCityModal(true)}>
        {selectedCity}
        <ChevronDownIcon />
      </button>

      {/* Restaurant List */}
      <section className="restaurant-list">
        {filteredRestaurants.map((restaurant) => (
          <Link
            key={restaurant.id}
            to={`/restaurant/${restaurant.id}`}
            className="restaurant-card"
          >
            <div className="restaurant-card-image">
              <img src={restaurant.heroImage} alt={restaurant.name} />
              <div className="restaurant-card-logo">
                <span className="restaurant-card-logo-text">{restaurant.name}</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Main Button */}
      <div className="main-button">
        <button onClick={() => {
          if (filteredRestaurants.length > 0) {
            navigate(`/restaurant/${filteredRestaurants[0].id}/booking`)
          }
        }}>
          Забронировать
        </button>
      </div>

      {/* City Modal */}
      <div
        className={`modal-overlay ${showCityModal ? 'open' : ''}`}
        onClick={() => setShowCityModal(false)}
      >
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <span className="modal-title">Выберите город</span>
            <button className="modal-close" onClick={() => setShowCityModal(false)}>
              <XIcon />
            </button>
          </div>
          <div className="modal-content">
            {cities.map((city) => (
              <button
                key={city}
                className={`modal-option ${city === selectedCity ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedCity(city)
                  setShowCityModal(false)
                }}
              >
                {city}
                {city === selectedCity && <CheckIcon />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Full-screen Event Story */}
      {showEventModal && selectedEvent && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          background: '#000'
        }}>
          <img
            src={selectedEvent.image}
            alt={selectedEvent.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.6
            }}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            padding: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{
              flex: 1,
              height: 3,
              background: 'rgba(255,255,255,0.3)',
              borderRadius: 2,
              marginRight: 8
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                background: 'white',
                borderRadius: 2,
                animation: 'progress 5s linear'
              }} />
            </div>
            <button
              onClick={() => setShowEventModal(false)}
              style={{
                width: 32,
                height: 32,
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <XIcon />
            </button>
          </div>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 24,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.9))'
          }}>
            <h2 style={{ color: 'white', fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
              {selectedEvent.title}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginBottom: 8 }}>
              {formatEventDate(selectedEvent.date)}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14, marginBottom: 16, lineHeight: 1.5 }}>
              {selectedEvent.description}
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 16
            }}>
              <span style={{ color: 'white', fontSize: 28, fontWeight: 700 }}>
                {selectedEvent.price.toLocaleString()} ₽
              </span>
            </div>
            <button
              onClick={() => {
                setShowEventModal(false)
                alert('Демо: здесь откроется форма покупки билета с выбором количества и оплатой')
              }}
              style={{
                width: '100%',
                padding: 16,
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Купить билет
            </button>
            <p style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.5)',
              textAlign: 'center',
              marginTop: 12
            }}>
              После покупки билет появится в разделе «Мои билеты»
            </p>
          </div>
        </div>
      )}

      {/* Banquet Modal */}
      <div
        className={`modal-overlay ${showBanquetModal ? 'open' : ''}`}
        onClick={() => setShowBanquetModal(false)}
      >
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <span className="modal-title">Банкеты</span>
            <button className="modal-close" onClick={() => setShowBanquetModal(false)}>
              <XIcon />
            </button>
          </div>
          <div className="modal-content" style={{ padding: 20 }}>
            <p style={{ fontSize: 14, marginBottom: 16, lineHeight: 1.5 }}>
              Организуем банкеты любого масштаба: от камерных ужинов до корпоративных мероприятий на 100+ гостей.
            </p>
            <div style={{
              background: 'var(--surface-bg)',
              borderRadius: 12,
              padding: 16,
              marginBottom: 16
            }}>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>Что включено:</p>
              <ul style={{ fontSize: 14, paddingLeft: 20, margin: 0 }}>
                <li style={{ marginBottom: 6 }}>Индивидуальное меню</li>
                <li style={{ marginBottom: 6 }}>Персональный менеджер</li>
                <li style={{ marginBottom: 6 }}>Декор и оформление</li>
                <li>Музыкальное сопровождение</li>
              </ul>
            </div>
            <a
              href="tel:+79999999999"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                width: '100%',
                padding: '14px',
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-full)',
                fontSize: 14,
                fontWeight: 500,
                textDecoration: 'none'
              }}
            >
              <PhoneIcon />
              +7 999 999-99-99
            </a>
            <p style={{
              fontSize: 11,
              color: 'var(--text-secondary)',
              textAlign: 'center',
              marginTop: 12,
              opacity: 0.7
            }}>
              Демо: звонок менеджеру по банкетам
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
