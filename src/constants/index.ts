export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const ROUTES = {
  HOME: '/',
  ROOMS: '/rooms',
  ROOM_DETAIL: '/rooms/:id',
  LOGIN: '/login',
  REGISTER: '/register',
}

export const ROOM_TYPES = ['single', 'double', 'dormitory'] as const
export const USER_ROLES = ['student', 'hostel_admin', 'admin'] as const
