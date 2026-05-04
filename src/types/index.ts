export type Property = {
  id: string
  title: string
  city: string
  state: string
  price: number
  bedrooms: number
  bathrooms: number
  type: 'apartment' | 'house' | 'condo'
  image: string
}

export type User = {
  id: string
  email: string
  name: string
  role: 'tenant' | 'landlord' | 'admin'
}
