import { Restaurant, Event } from '../types'

export const restaurants: Restaurant[] = [
  {
    id: 'smoke-bbq',
    name: 'SMOKE BBQ',
    address: 'Москва, ул. Трубная, 18',
    city: 'Москва',
    averageCheck: 3000,
    workingHours: {
      open: '12:00',
      close: '23:00'
    },
    heroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=200&q=80',
    description: 'SMOKE BBQ — это место, где мясо готовится по всем правилам американского барбекю. Мы используем только премиальные отрубы и коптим их на дровах в наших смокерах.',
    aboutChef: 'Шеф-повар Алексей Иванов — мастер барбекю с 15-летним опытом. Обучался в Техасе у легендарных питмастеров и привнёс лучшие традиции американского BBQ в Россию.',
    coordinates: {
      lat: 55.7673,
      lng: 37.6257
    },
    gallery: [
      { id: '1', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80', category: 'interior' },
      { id: '2', url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80', category: 'interior' },
      { id: '3', url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80', category: 'interior' },
      { id: '4', url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80', category: 'drinks' },
      { id: '5', url: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80', category: 'drinks' },
      { id: '6', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80', category: 'food' },
      { id: '7', url: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&q=80', category: 'food' },
      { id: '8', url: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80', category: 'food' },
    ],
    menu: [
      {
        id: 'starters',
        name: 'Закуски',
        items: [
          { id: '1', name: 'Начос с гуакамоле', description: 'Кукурузные чипсы, гуакамоле, сальса, сметана', price: 650, weight: '320г', inStop: false },
          { id: '2', name: 'Крылышки BBQ', description: 'Куриные крылышки в соусе BBQ', price: 750, weight: '400г', inStop: false },
          { id: '3', name: 'Ребрышки на кости', description: 'Свиные ребрышки горячего копчения', price: 890, weight: '350г', inStop: true },
        ]
      },
      {
        id: 'main',
        name: 'Основные блюда',
        items: [
          { id: '4', name: 'Брискет', description: 'Говяжья грудинка 14-часового копчения', price: 1800, weight: '300г', inStop: false },
          { id: '5', name: 'Пулд порк', description: 'Томленая свиная лопатка', price: 1200, weight: '350г', inStop: false },
          { id: '6', name: 'Стейк Рибай', description: 'Мраморная говядина, прожарка на выбор', price: 2800, weight: '400г', inStop: true },
          { id: '7', name: 'Бургер SMOKE', description: 'Котлета из брискета, бекон, чеддер, соус BBQ', price: 890, weight: '380г', inStop: false },
        ]
      },
      {
        id: 'sides',
        name: 'Гарниры',
        items: [
          { id: '8', name: 'Картофель фри', description: 'С соусом на выбор', price: 350, weight: '200г', inStop: false },
          { id: '9', name: 'Коулслоу', description: 'Капустный салат по-американски', price: 290, weight: '150г', inStop: false },
          { id: '10', name: 'Кукуруза гриль', description: 'С маслом и специями', price: 320, weight: '180г', inStop: false },
        ]
      },
      {
        id: 'drinks',
        name: 'Напитки',
        items: [
          { id: '11', name: 'Лимонад домашний', description: 'Классический, имбирный или ягодный', price: 350, weight: '400мл', inStop: false },
          { id: '12', name: 'Американо', description: 'Кофе эспрессо с водой', price: 250, weight: '200мл', inStop: false },
          { id: '13', name: 'Смузи ягодный', description: 'Микс лесных ягод с йогуртом', price: 450, weight: '350мл', inStop: true },
        ]
      }
    ]
  },
  {
    id: 'omakase-house',
    name: 'OMAKASE HOUSE',
    address: 'Москва, Патриаршие пруды, 5',
    city: 'Москва',
    averageCheck: 8000,
    workingHours: {
      open: '18:00',
      close: '00:00'
    },
    heroImage: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80',
    logo: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&q=80',
    description: 'OMAKASE HOUSE — эксклюзивный японский ресторан с авторской кухней. Каждый вечер шеф-повар готовит уникальное меню из свежайших продуктов, доставляемых из Японии.',
    aboutChef: 'Шеф-повар Такеши Ямамото — обладатель звезды Мишлен, 20 лет опыта в лучших ресторанах Токио и Нью-Йорка.',
    coordinates: {
      lat: 55.7614,
      lng: 37.5918
    },
    gallery: [
      { id: '1', url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&q=80', category: 'food' },
      { id: '2', url: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80', category: 'interior' },
    ],
    menu: [
      {
        id: 'omakase',
        name: 'Омакасе сеты',
        items: [
          { id: '1', name: 'Омакасе 7 подач', description: 'Авторское меню шефа из 7 перемен', price: 8000, inStop: false },
          { id: '2', name: 'Омакасе 12 подач', description: 'Полный сет с премиальными ингредиентами', price: 15000, inStop: false },
        ]
      }
    ]
  }
]

export const events: Event[] = [
  {
    id: 'bbq-brunch',
    title: 'BBQ-бранч',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80',
    date: '2025-02-15',
    restaurantId: 'smoke-bbq',
    price: 3500,
    description: 'Воскресный бранч с безлимитным BBQ и напитками. Живая музыка и отличная атмосфера!'
  },
  {
    id: 'omakase-dinner',
    title: 'Omakase ужин',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=80',
    date: '2025-02-20',
    restaurantId: 'omakase-house',
    price: 12000,
    description: 'Эксклюзивный ужин на 12 персон с участием шефа. Дегустация премиальных саке.'
  }
]

export const cities = ['Москва', 'Санкт-Петербург', 'Сочи']
