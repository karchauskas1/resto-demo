import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon, ShoppingBagIcon, UtensilsIcon, NavigationIcon } from '../components/Icons'

export default function MyOrders() {
  const navigate = useNavigate()

  return (
    <div className="profile-page">
      <div className="profile-header">
        <button className="profile-back" onClick={() => navigate(-1)}>
          <ChevronLeftIcon />
        </button>
        <span className="profile-title">Мои заказы</span>
      </div>

      <div className="profile-content">
        <div className="empty-state">
          <div className="empty-state-icon" style={{ display: 'flex', justifyContent: 'center' }}>
            <ShoppingBagIcon />
          </div>
          <p className="empty-state-text">У вас пока нет заказов</p>
        </div>

        <div className="info-section" style={{ marginTop: 24, borderRadius: 16 }}>
          <h3 className="info-title">Что такое заказы?</h3>
          <p className="info-text" style={{ marginBottom: 16 }}>
            Здесь клиенты могут делать предзаказы блюд ко времени бронирования или заказывать еду навынос/с доставкой.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ color: 'var(--primary)', flexShrink: 0 }}>
                <UtensilsIcon />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>Предзаказ к бронированию</p>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Клиент выбирает блюда заранее, и они будут готовы к его приходу</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ color: 'var(--primary)', flexShrink: 0 }}>
                <ShoppingBagIcon />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>Навынос</p>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Заказ блюд с самовывозом из ресторана</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ color: 'var(--primary)', flexShrink: 0 }}>
                <NavigationIcon />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>Доставка</p>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Доставка блюд по указанному адресу</p>
              </div>
            </div>
          </div>
        </div>

        <div className="info-section" style={{ marginTop: 16, borderRadius: 16 }}>
          <h3 className="info-title">История заказов</h3>
          <p className="info-text">
            Все предыдущие заказы сохраняются в истории. Клиент может повторить любимый заказ в один клик или оставить отзыв.
          </p>
        </div>

        <p style={{
          fontSize: 11,
          color: 'var(--text-secondary)',
          textAlign: 'center',
          marginTop: 16,
          opacity: 0.7
        }}>
          Демо: интеграция с кухней и системой доставки
        </p>
      </div>
    </div>
  )
}
