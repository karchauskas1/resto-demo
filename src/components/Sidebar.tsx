import { useNavigate } from 'react-router-dom'
import {
  ChevronLeftIcon,
  PencilIcon,
  TicketIcon,
  ShoppingBagIcon,
  GiftIcon,
  BellIcon,
  SettingsIcon
} from './Icons'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { icon: PencilIcon, label: 'Мои бронирования', path: '/my-bookings' },
  { icon: TicketIcon, label: 'Мои билеты', path: '/my-tickets' },
  { icon: ShoppingBagIcon, label: 'Мои заказы', path: '/my-orders' },
  { icon: GiftIcon, label: 'Подарочные сертификаты', path: '/certificates' },
  { icon: BellIcon, label: 'Мои уведомления', path: '/notifications' },
  { icon: SettingsIcon, label: 'Личные данные', path: '/personal-data' },
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate()

  const handleNavigate = (path: string) => {
    onClose()
    navigate(path)
  }

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="sidebar-back" onClick={onClose}>
            <ChevronLeftIcon />
          </button>
          <span className="sidebar-title">Профиль</span>
        </div>
        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <button
              key={item.path}
              className="sidebar-menu-item"
              onClick={() => handleNavigate(item.path)}
            >
              <item.icon />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  )
}
