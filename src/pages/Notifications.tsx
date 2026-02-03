import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon } from '../components/Icons'

export default function Notifications() {
  const navigate = useNavigate()

  return (
    <div className="profile-page">
      <div className="profile-header">
        <button className="profile-back" onClick={() => navigate(-1)}>
          <ChevronLeftIcon />
        </button>
        <span className="profile-title">Мои уведомления</span>
      </div>

      <div className="profile-content">
        <div className="empty-state">
          <div className="empty-state-icon">🔔</div>
          <p className="empty-state-text">У вас пока нет уведомлений</p>
        </div>
      </div>
    </div>
  )
}
