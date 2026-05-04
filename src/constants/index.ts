export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const ROUTES = {
  HOME: '/',
  PROPERTIES: '/properties',
  PROPERTY_DETAIL: '/properties/:id',
  LOGIN: '/login',
  REGISTER: '/register',
}

export const PROPERTY_TYPES = ['apartment', 'house', 'condo'] as const
export const USER_ROLES = ['tenant', 'landlord', 'admin'] as const
