import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon } from '../components/Icons'

export default function PersonalData() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const savedPhone = localStorage.getItem('userPhone')
    const savedName = localStorage.getItem('userName')
    const savedEmail = localStorage.getItem('userEmail')
    if (savedPhone) setPhone(savedPhone)
    if (savedName) setName(savedName)
    if (savedEmail) setEmail(savedEmail)
  }, [])

  const handleSave = () => {
    localStorage.setItem('userPhone', phone)
    localStorage.setItem('userName', name)
    localStorage.setItem('userEmail', email)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)

    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.hapticFeedback.notificationOccurred('success')
    }
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
        <span className="profile-title">Личные данные</span>
      </div>

      <div className="booking-form">
        <div className="form-group">
          <label className="form-label">Имя</label>
          <input
            type="text"
            className="form-input"
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Телефон</label>
          <input
            type="tel"
            className="form-input"
            placeholder="+7 (___) ___-__-__"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          className="onboarding-button"
          onClick={handleSave}
          style={{ marginTop: 24 }}
        >
          {saved ? '✓ Сохранено' : 'Сохранить'}
        </button>
      </div>
    </div>
  )
}
