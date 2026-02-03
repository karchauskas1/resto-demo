export interface Restaurant {
  id: string
  name: string
  address: string
  city: string
  averageCheck: number
  workingHours: {
    open: string
    close: string
  }
  heroImage: string
  logo: string
  description: string
  aboutChef: string
  coordinates: {
    lat: number
    lng: number
  }
  gallery: GalleryImage[]
  menu: MenuCategory[]
}

export interface GalleryImage {
  id: string
  url: string
  category: 'interior' | 'drinks' | 'food' | 'all'
}

export interface MenuCategory {
  id: string
  name: string
  items: MenuItem[]
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  weight?: string
  image?: string
  inStop: boolean
}

export interface Event {
  id: string
  title: string
  image: string
  date: string
  restaurantId: string
  price: number
  description: string
}

export interface Booking {
  id: string
  restaurantId: string
  date: string
  time: string
  guests: number
  name: string
  phone: string
  status: 'pending' | 'confirmed' | 'cancelled'
}

export interface Certificate {
  id: string
  amount: number
  code: string
  validUntil: string
  used: boolean
}

export interface UserProfile {
  id: string
  phone: string
  name: string
  bookings: Booking[]
  tickets: string[]
  orders: string[]
  certificates: Certificate[]
}

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void
        expand: () => void
        close: () => void
        MainButton: {
          text: string
          color: string
          textColor: string
          isVisible: boolean
          isActive: boolean
          show: () => void
          hide: () => void
          onClick: (callback: () => void) => void
          offClick: (callback: () => void) => void
          enable: () => void
          disable: () => void
        }
        BackButton: {
          isVisible: boolean
          show: () => void
          hide: () => void
          onClick: (callback: () => void) => void
          offClick: (callback: () => void) => void
        }
        themeParams: {
          bg_color: string
          text_color: string
          hint_color: string
          link_color: string
          button_color: string
          button_text_color: string
          secondary_bg_color: string
        }
        initDataUnsafe: {
          user?: {
            id: number
            first_name: string
            last_name?: string
            username?: string
            language_code?: string
          }
        }
        openLink: (url: string) => void
        hapticFeedback: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void
          selectionChanged: () => void
        }
      }
    }
  }
}
