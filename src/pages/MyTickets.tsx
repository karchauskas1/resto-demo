import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon, TicketIcon, BellIcon, XIcon } from '../components/Icons'
import { events } from '../data/restaurants'

interface Event {
  id: string
  title: string
  image: string
  date: string
  restaurantId: string
  price: number
  description: string
}

export default function MyTickets() {
  const navigate = useNavigate()
  const [showStory, setShowStory] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const formatEventDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
    setShowStory(true)
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <button className="profile-back" onClick={() => navigate(-1)}>
          <ChevronLeftIcon />
        </button>
        <span className="profile-title">Мероприятия</span>
      </div>

      <div className="profile-content">
        <div className="empty-state" style={{ marginBottom: 24, paddingBottom: 24 }}>
          <div className="empty-state-icon" style={{ display: 'flex', justifyContent: 'center' }}>
            <TicketIcon />
          </div>
          <p className="empty-state-text">У вас пока нет билетов на мероприятия</p>
        </div>

        <div className="info-section" style={{ margin: 0, marginBottom: 16, borderRadius: 16 }}>
          <h3 className="info-title">Что здесь будет?</h3>
          <p className="info-text" style={{ marginBottom: 12 }}>
            Билеты на приобретённые мероприятия с QR-кодом для входа. Клиент показывает QR-код на входе, и его отмечают в системе.
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{
              flex: 1,
              padding: 12,
              background: 'var(--bg)',
              borderRadius: 12,
              textAlign: 'center'
            }}>
              <div style={{ marginBottom: 4, color: 'var(--primary)' }}>
                <TicketIcon />
              </div>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Электронный билет</span>
            </div>
            <div style={{
              flex: 1,
              padding: 12,
              background: 'var(--bg)',
              borderRadius: 12,
              textAlign: 'center'
            }}>
              <div style={{ marginBottom: 4, color: 'var(--primary)' }}>
                <BellIcon />
              </div>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Напоминания</span>
            </div>
            <div style={{
              flex: 1,
              padding: 12,
              background: 'var(--bg)',
              borderRadius: 12,
              textAlign: 'center'
            }}>
              <div style={{ marginBottom: 4, color: 'var(--primary)' }}>
                <XIcon />
              </div>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Возврат</span>
            </div>
          </div>
        </div>

        <div className="info-section" style={{ margin: 0, borderRadius: 16 }}>
          <h3 className="info-title">Ближайшие мероприятия</h3>
          <p className="info-text" style={{ marginBottom: 12 }}>
            Клиенты могут покупать билеты на гастроужины, дегустации, мастер-классы и другие события
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {events.map((event) => (
              <div
                key={event.id}
                onClick={() => handleEventClick(event)}
                style={{
                  display: 'flex',
                  gap: 12,
                  padding: 12,
                  background: 'var(--bg)',
                  borderRadius: 12,
                  cursor: 'pointer'
                }}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 8,
                    objectFit: 'cover'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{event.title}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 8 }}>
                    {formatEventDate(event.date)}
                  </p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)' }}>
                    {event.price.toLocaleString()} ₽
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p style={{
          fontSize: 11,
          color: 'var(--text-secondary)',
          textAlign: 'center',
          marginTop: 16,
          opacity: 0.7
        }}>
          Демо: интеграция с системой продажи билетов
        </p>
      </div>

      {/* Full-screen Story */}
      {showStory && selectedEvent && (
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
              onClick={() => setShowStory(false)}
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
                setShowStory(false)
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
    </div>
  )
}
