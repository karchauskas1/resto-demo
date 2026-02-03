import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ChevronLeftIcon,
  ShareIcon,
  UserIcon,
  ClockIcon,
  WalletIcon,
  MapPinIcon,
  NavigationIcon,
  PhoneIcon
} from '../components/Icons'
import { restaurants } from '../data/restaurants'

type TabType = 'booking' | 'gallery' | 'menu' | 'banquets' | 'events' | 'certificates'
type GalleryFilter = 'all' | 'interior' | 'drinks' | 'food'

export default function RestaurantDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>('gallery')
  const [galleryFilter, setGalleryFilter] = useState<GalleryFilter>('all')

  const restaurant = restaurants.find(r => r.id === id)

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

  const filteredGallery = galleryFilter === 'all'
    ? restaurant.gallery
    : restaurant.gallery.filter(img => img.category === galleryFilter)

  const openYandexMaps = () => {
    const url = `https://yandex.ru/maps/?pt=${restaurant.coordinates.lng},${restaurant.coordinates.lat}&z=17&l=map`
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.openLink(url)
    } else {
      window.open(url, '_blank')
    }
  }

  const tabs = [
    { id: 'booking' as TabType, label: 'Бронь' },
    { id: 'gallery' as TabType, label: 'Галерея' },
    { id: 'menu' as TabType, label: 'Меню' },
    { id: 'banquets' as TabType, label: 'Банкеты' },
    { id: 'events' as TabType, label: 'Мероприятия' },
    { id: 'certificates' as TabType, label: 'Сертиф' },
  ]

  const galleryFilters: { id: GalleryFilter; label: string }[] = [
    { id: 'all', label: 'Все фото' },
    { id: 'interior', label: 'Интерьер' },
    { id: 'drinks', label: 'Напитки' },
    { id: 'food', label: 'Блюда' },
  ]

  return (
    <div className="restaurant-detail">
      {/* Hero */}
      <div className="restaurant-hero">
        <img src={restaurant.heroImage} alt={restaurant.name} />
        <div className="restaurant-hero-overlay" />
        <div className="restaurant-hero-nav">
          <button className="restaurant-hero-nav-btn" onClick={() => navigate(-1)}>
            <ChevronLeftIcon />
          </button>
          <div className="restaurant-hero-nav-right">
            <button className="restaurant-hero-nav-btn">
              <ShareIcon />
            </button>
            <button className="restaurant-hero-nav-btn">
              <UserIcon />
            </button>
          </div>
        </div>
        <div className="restaurant-hero-content">
          <h1 className="restaurant-hero-name">{restaurant.name}</h1>
          <p className="restaurant-hero-address">{restaurant.address}</p>
          <div className="restaurant-hero-info">
            <div className="restaurant-hero-info-item">
              <WalletIcon />
              <span>{restaurant.averageCheck} ₽</span>
              <span style={{ opacity: 0.7, marginLeft: -4 }}>Средний чек</span>
            </div>
            <div className="restaurant-hero-info-item">
              <ClockIcon />
              <span>Открыто</span>
              <span style={{ opacity: 0.7, marginLeft: -4 }}>до {restaurant.workingHours.close}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'gallery' && (
        <div className="gallery">
          <h2 className="gallery-title">Галерея</h2>
          <div className="gallery-filters">
            {galleryFilters.map((filter) => (
              <button
                key={filter.id}
                className={`gallery-filter ${galleryFilter === filter.id ? 'active' : ''}`}
                onClick={() => setGalleryFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="gallery-grid">
            {filteredGallery.map((image, index) => (
              <div key={image.id} className={`gallery-item ${index === 0 ? 'large' : ''}`}>
                <img src={image.url} alt="" />
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'menu' && (
        <div className="menu-section">
          {restaurant.menu.map((category) => (
            <div key={category.id} className="menu-category">
              <h3 className="menu-category-title">{category.name}</h3>
              {category.items.map((item) => (
                <div key={item.id} className="menu-item">
                  <div className="menu-item-info">
                    <div className="menu-item-name">
                      {item.name}
                      {item.inStop && <span className="menu-item-stop">В стопе</span>}
                    </div>
                    <div className="menu-item-description">{item.description}</div>
                    {item.weight && <div className="menu-item-weight">{item.weight}</div>}
                  </div>
                  <div className="menu-item-price">{item.price} ₽</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'booking' && (
        <>
          <div className="info-section">
            <h3 className="info-title">О месте</h3>
            <p className="info-text">{restaurant.description}</p>
          </div>

          <div className="info-section">
            <h3 className="info-title">О шефе</h3>
            <p className="info-text">{restaurant.aboutChef}</p>
          </div>

          <div className="info-section">
            <h3 className="info-title">Детали</h3>
            <div className="info-row">
              <MapPinIcon />
              <div className="info-row-content">
                <div className="info-row-label">Адрес</div>
                <div className="info-row-value">{restaurant.address}</div>
              </div>
            </div>
            <div className="info-row">
              <ClockIcon />
              <div className="info-row-content">
                <div className="info-row-label">Время работы</div>
                <div className="info-row-value">{restaurant.workingHours.open} — {restaurant.workingHours.close}</div>
              </div>
            </div>
            <div className="info-row">
              <PhoneIcon />
              <div className="info-row-content">
                <div className="info-row-label">Телефон</div>
                <div className="info-row-value">+7 (495) 123-45-67</div>
              </div>
            </div>
            <button className="map-button" onClick={openYandexMaps}>
              <NavigationIcon />
              Проложить маршрут в Яндекс.Картах
            </button>
          </div>
        </>
      )}

      {activeTab === 'banquets' && (
        <div className="info-section">
          <h3 className="info-title">Банкеты</h3>
          <p className="info-text">
            Организуем банкеты любого масштаба: от камерных ужинов до корпоративных мероприятий.
            Свяжитесь с нами для обсуждения деталей.
          </p>
          <button className="map-button" style={{ marginTop: 16 }}>
            <PhoneIcon />
            Связаться с менеджером
          </button>
        </div>
      )}

      {activeTab === 'events' && (
        <div className="info-section">
          <h3 className="info-title">Ближайшие мероприятия</h3>
          <p className="info-text" style={{ color: '#999' }}>
            Пока нет запланированных мероприятий в этом ресторане
          </p>
        </div>
      )}

      {activeTab === 'certificates' && (
        <div className="info-section">
          <h3 className="info-title">Подарочные сертификаты</h3>
          <p className="info-text">
            Подарите незабываемые гастрономические впечатления! Доступны сертификаты номиналом
            от 3 000 до 50 000 ₽.
          </p>
          <button className="map-button" style={{ marginTop: 16, background: 'var(--primary-color)', color: 'white', border: 'none' }}>
            Купить сертификат
          </button>
        </div>
      )}

      {/* Main Button */}
      <div className="main-button">
        <button onClick={() => navigate(`/restaurant/${id}/booking`)}>
          Забронировать
        </button>
      </div>
    </div>
  )
}
