import { useState } from 'react'

interface OnboardingProps {
  onComplete: () => void
}

const slides = [
  {
    icon: '🍽️',
    title: 'Добро пожаловать!',
    text: 'Dreamteam Concierge — ваш персональный помощник в мире лучших ресторанов'
  },
  {
    icon: '📅',
    title: 'Бронирование',
    text: 'Забронируйте столик в лучших ресторанах города в пару кликов'
  },
  {
    icon: '🎫',
    title: 'Мероприятия',
    text: 'Узнавайте о специальных событиях, дегустациях и гастрономических вечерах'
  },
  {
    icon: '🎁',
    title: 'Сертификаты',
    text: 'Дарите незабываемые впечатления с нашими подарочными сертификатами'
  }
]

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [phone, setPhone] = useState('')
  const [showPhoneInput, setShowPhoneInput] = useState(false)

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      setShowPhoneInput(true)
    }
  }

  const handlePhoneSubmit = () => {
    if (phone.length >= 10) {
      localStorage.setItem('userPhone', phone)
      onComplete()
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setPhone(formatted)
  }

  if (showPhoneInput) {
    return (
      <div className="onboarding">
        <div className="onboarding-slide">
          <div className="onboarding-icon" style={{ fontSize: '80px' }}>📱</div>
          <h1 className="onboarding-title">Ваш номер телефона</h1>
          <p className="onboarding-text">
            Введите номер для бронирования и получения уведомлений
          </p>
          <div className="phone-input-container">
            <input
              type="tel"
              className="phone-input"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={handlePhoneChange}
              autoFocus
            />
          </div>
        </div>
        <button
          className="onboarding-button"
          onClick={handlePhoneSubmit}
          disabled={phone.length < 16}
          style={{ opacity: phone.length < 16 ? 0.5 : 1 }}
        >
          Продолжить
        </button>
        <button className="onboarding-skip" onClick={onComplete}>
          Пропустить
        </button>
      </div>
    )
  }

  return (
    <div className="onboarding">
      <div className="onboarding-slide">
        <div className="onboarding-icon" style={{ fontSize: '80px' }}>
          {slides[currentSlide].icon}
        </div>
        <h1 className="onboarding-title">{slides[currentSlide].title}</h1>
        <p className="onboarding-text">{slides[currentSlide].text}</p>
      </div>
      <div className="onboarding-dots">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`onboarding-dot ${index === currentSlide ? 'active' : ''}`}
          />
        ))}
      </div>
      <button className="onboarding-button" onClick={handleNext}>
        {currentSlide < slides.length - 1 ? 'Далее' : 'Начать'}
      </button>
      <button className="onboarding-skip" onClick={onComplete}>
        Пропустить
      </button>
    </div>
  )
}
