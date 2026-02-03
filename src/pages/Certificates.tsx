import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon, XIcon } from '../components/Icons'

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
  const [showPreview, setShowPreview] = useState(false)

  const handlePurchase = () => {
    if (!selectedAmount) {
      alert('Выберите номинал сертификата')
      return
    }
    setShowPreview(true)
  }

  const generateCertCode = () => {
    return 'GIFT-' + Math.random().toString(36).substring(2, 8).toUpperCase()
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

      {/* Certificate Preview Modal */}
      <div
        className={`modal-overlay ${showPreview ? 'open' : ''}`}
        onClick={() => setShowPreview(false)}
      >
        <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 340 }}>
          <div className="modal-header">
            <span className="modal-title">Ваш сертификат готов!</span>
            <button className="modal-close" onClick={() => setShowPreview(false)}>
              <XIcon />
            </button>
          </div>
          <div className="modal-content" style={{ padding: 0 }}>
            {/* Certificate Preview */}
            <div style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
              padding: 24,
              margin: 16,
              borderRadius: 16,
              border: '1px solid var(--primary-color)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: -20,
                right: -20,
                width: 80,
                height: 80,
                background: 'var(--primary-color)',
                opacity: 0.1,
                borderRadius: '50%'
              }} />
              <p style={{
                fontSize: 12,
                color: 'var(--primary-color)',
                letterSpacing: 2,
                marginBottom: 8
              }}>ПОДАРОЧНЫЙ СЕРТИФИКАТ</p>
              <p style={{
                fontSize: 32,
                fontWeight: 700,
                marginBottom: 16,
                color: 'white'
              }}>{selectedAmount?.toLocaleString()} ₽</p>
              {recipientName && (
                <p style={{ fontSize: 14, marginBottom: 8, color: 'var(--text-secondary)' }}>
                  Для: <span style={{ color: 'white' }}>{recipientName}</span>
                </p>
              )}
              {message && (
                <p style={{
                  fontSize: 13,
                  fontStyle: 'italic',
                  color: 'var(--text-secondary)',
                  marginBottom: 16,
                  lineHeight: 1.4
                }}>"{message}"</p>
              )}
              <div style={{
                borderTop: '1px dashed var(--border-color)',
                paddingTop: 12,
                marginTop: 8
              }}>
                <p style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                  Код: <span style={{ fontFamily: 'monospace', color: 'var(--primary-color)' }}>
                    {generateCertCode()}
                  </span>
                </p>
                <p style={{ fontSize: 10, color: 'var(--text-secondary)', marginTop: 4 }}>
                  Действителен 1 год
                </p>
              </div>
            </div>

            <div style={{ padding: '0 16px 16px' }}>
              <p style={{
                fontSize: 13,
                color: 'var(--text-secondary)',
                textAlign: 'center',
                marginBottom: 16,
                lineHeight: 1.5
              }}>
                Сертификат будет отправлен на указанный email или в Telegram
              </p>
              <button
                onClick={() => {
                  setShowPreview(false)
                  alert('Демо: Здесь откроется форма оплаты')
                }}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                  marginBottom: 8
                }}
              >
                Оплатить {selectedAmount?.toLocaleString()} ₽
              </button>
              <p style={{
                fontSize: 11,
                color: 'var(--text-secondary)',
                textAlign: 'center',
                opacity: 0.7
              }}>
                Демо: интеграция с платежной системой
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
