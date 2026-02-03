import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MenuIcon, ChevronDownIcon, CalendarIcon, UtensilsIcon, GiftIcon } from '../components/Icons'
import { restaurants, events, cities } from '../data/restaurants'

interface MainScreenProps {
  onMenuClick: () => void
}

export default function MainScreen({ onMenuClick }: MainScreenProps) {
  const [selectedCity, setSelectedCity] = useState('Москва')
  const [showCityModal, setShowCityModal] = useState(false)
  const navigate = useNavigate()

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

      {/* Featured Events */}
      <section className="featured-events">
        <div className="featured-events-scroll">
          {events.map((event) => (
            <div key={event.id} className="featured-event-card">
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
        <button className="quick-action">
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
        <button className="quick-action">
          <div className="quick-action-icon">👥</div>
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
              ✕
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
                {city === selectedCity && <span>✓</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
