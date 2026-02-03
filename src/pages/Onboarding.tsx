import { useState } from 'react'

interface OnboardingProps {
  onComplete: () => void
}

const slides = [
  {
    icon: 'welcome',
    title: 'Добро пожаловать!',
    text: 'Это демо-приложение для ресторанов. Здесь показано, как ваши гости смогут взаимодействовать с заведением'
  },
  {
    icon: 'calendar',
    title: 'Бронирование',
    text: 'Клиент бронирует столик за пару кликов — без звонков и ожидания'
  },
  {
    icon: 'ticket',
    title: 'Мероприятия',
    text: 'Продажа билетов на дегустации, гастроужины и другие события прямо в приложении'
  },
  {
    icon: 'gift',
    title: 'Сертификаты',
    text: 'Электронные подарочные сертификаты с красивым дизайном и мгновенной доставкой'
  },
  {
    icon: 'homescreen',
    title: 'Всегда под рукой',
    text: 'Приложение можно добавить на рабочий стол телефона. Клиент всегда сможет быстро забронировать столик — без поиска в Telegram'
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

  const renderIcon = (iconName: string) => {
    const style = { width: 80, height: 80, color: 'var(--primary)' }
    switch (iconName) {
      case 'welcome':
        return (
          <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        )
      case 'calendar':
        return (
          <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        )
      case 'ticket':
        return (
          <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
            <path d="M13 5v2"></path>
            <path d="M13 17v2"></path>
            <path d="M13 11v2"></path>
          </svg>
        )
      case 'gift':
        return (
          <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="8" width="18" height="4" rx="1"></rect>
            <path d="M12 8v13"></path>
            <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path>
            <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path>
          </svg>
        )
      case 'homescreen':
        return (
          <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="5" y="2" width="14" height="20" rx="2" />
            <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )
      case 'phone':
        return (
          <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        )
      default:
        return null
    }
  }

  if (showPhoneInput) {
    return (
      <div className="onboarding">
        <div className="onboarding-slide">
          <div className="onboarding-icon" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {renderIcon('phone')}
          </div>
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
        <div className="onboarding-icon" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {renderIcon(slides[currentSlide].icon)}
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
