import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon } from '../components/Icons'

const certificateOptions = [
  { value: 3000, label: '3 000 ₽' },
  { value: 5000, label: '5 000 ₽' },
  { value: 10000, label: '10 000 ₽' },
  { value: 15000, label: '15 000 ₽' },
  { value: 25000, label: '25 000 ₽' },
  { value: 50000, label: '50 000 ₽' },
]

export default function Certificates() {
  const navigate = useNavigate()
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [recipientName, setRecipientName] = useState('')
  const [message, setMessage] = useState('')

  const handlePurchase = () => {
    if (!selectedAmount) {
      alert('Выберите номинал сертификата')
      return
    }
    alert('Функция покупки сертификата будет доступна в ближайшее время!')
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <button className="profile-back" onClick={() => navigate(-1)}>
          <ChevronLeftIcon />
        </button>
        <span className="profile-title">Подарочные сертификаты</span>
      </div>

      <div className="profile-content">
        <div className="info-section" style={{ margin: 0, borderRadius: 16 }}>
          <h3 className="info-title">Выберите номинал</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {certificateOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedAmount(option.value)}
                style={{
                  padding: '16px 8px',
                  borderRadius: 12,
                  border: selectedAmount === option.value
                    ? '2px solid var(--primary-color)'
                    : '1px solid var(--border-color)',
                  background: selectedAmount === option.value
                    ? 'rgba(139, 115, 85, 0.1)'
                    : 'var(--card-bg)',
                  fontSize: 14,
                  fontWeight: selectedAmount === option.value ? 600 : 400,
                  color: 'var(--text-primary)',
                  cursor: 'pointer'
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="booking-form" style={{ marginTop: 16, borderRadius: 16 }}>
          <div className="form-group">
            <label className="form-label">Имя получателя</label>
            <input
              type="text"
              className="form-input"
              placeholder="Для кого сертификат"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Пожелание</label>
            <textarea
              className="form-input"
              placeholder="Ваше поздравление..."
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ resize: 'none' }}
            />
          </div>
        </div>

        <div className="info-section" style={{ marginTop: 16, borderRadius: 16 }}>
          <h3 className="info-title">Как это работает</h3>
          <p className="info-text">
            1. Выберите номинал сертификата<br/>
            2. Оплатите онлайн<br/>
            3. Получите электронный сертификат<br/>
            4. Отправьте его получателю
          </p>
          <p className="info-text" style={{ marginTop: 12 }}>
            Сертификат действует 1 год с момента покупки и может быть использован в любом ресторане сети.
          </p>
        </div>
      </div>

      <div className="main-button">
        <button onClick={handlePurchase}>
          {selectedAmount ? `Купить за ${selectedAmount.toLocaleString()} ₽` : 'Выберите номинал'}
        </button>
      </div>
    </div>
  )
}
