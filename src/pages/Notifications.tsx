import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon } from '../components/Icons'

interface NotificationSetting {
  id: string
  title: string
  description: string
  enabled: boolean
}

export default function Notifications() {
  const navigate = useNavigate()
  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: 'bookings',
      title: 'Бронирования',
      description: 'Подтверждения и напоминания о бронированиях',
      enabled: true
    },
    {
      id: 'events',
      title: 'Мероприятия',
      description: 'Анонсы новых мероприятий и напоминания',
      enabled: true
    },
    {
      id: 'promo',
      title: 'Акции и скидки',
      description: 'Специальные предложения и промокоды',
      enabled: false
    },
    {
      id: 'news',
      title: 'Новости ресторана',
      description: 'Обновления меню, новые блюда',
      enabled: false
    }
  ])

  const toggleSetting = (id: string) => {
    setSettings(prev => prev.map(s =>
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ))
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <button className="profile-back" onClick={() => navigate(-1)}>
          <ChevronLeftIcon />
        </button>
        <span className="profile-title">Уведомления</span>
      </div>

      <div className="profile-content">
        <div className="info-section" style={{ margin: 0, borderRadius: 16, marginBottom: 16 }}>
          <h3 className="info-title">Настройки уведомлений</h3>
          <p className="info-text" style={{ marginBottom: 16 }}>
            Выберите, какие уведомления вы хотите получать в Telegram
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {settings.map((setting) => (
              <div
                key={setting.id}
                onClick={() => toggleSetting(setting.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 14,
                  background: 'var(--bg)',
                  borderRadius: 12,
                  cursor: 'pointer'
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 2 }}>{setting.title}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{setting.description}</p>
                </div>
                <div style={{
                  width: 48,
                  height: 28,
                  borderRadius: 14,
                  background: setting.enabled ? 'var(--primary)' : 'var(--divider)',
                  padding: 2,
                  transition: 'background 0.2s'
                }}>
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    background: 'white',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    transform: setting.enabled ? 'translateX(20px)' : 'translateX(0)',
                    transition: 'transform 0.2s'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="info-section" style={{ margin: 0, borderRadius: 16 }}>
          <h3 className="info-title">Как это работает для бизнеса</h3>
          <p className="info-text" style={{ marginBottom: 12 }}>
            Push-уведомления в Telegram — мощный маркетинговый инструмент:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%',
                background: 'var(--primary)', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 600, flexShrink: 0
              }}>1</div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--text)' }}>Высокая открываемость</strong> — до 80% против 20% у email
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%',
                background: 'var(--primary)', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 600, flexShrink: 0
              }}>2</div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--text)' }}>Персонализация</strong> — сегментация по интересам и поведению
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%',
                background: 'var(--primary)', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 600, flexShrink: 0
              }}>3</div>
              <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--text)' }}>Мгновенная доставка</strong> — клиент видит уведомление сразу
              </p>
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
          Демо: настройки сохраняются локально
        </p>
      </div>
    </div>
  )
}
