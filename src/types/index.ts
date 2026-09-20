export type RoomType = 'single' | 'double' | 'dormitory'
export type AvailabilityStatus = 'available' | 'partially_occupied' | 'full' | 'maintenance'
export type ApplicationStatus = 'pending' | 'approved' | 'rejected'
export type AllocationStatus = 'active' | 'completed' | 'cancelled'
export type PaymentStatus = 'pending' | 'completed' | 'failed'

export interface User {
  id: string
  email: string
  name: string
  role: 'student' | 'hostel_admin' | 'admin'
}

export interface Student extends User {
  role: 'student'
  studentId: string
  university: string
  contactNumber: string
}

export interface Administrator extends User {
  role: 'hostel_admin' | 'admin'
  department?: string
}

export interface Room {
  id: string
  title: string
  district: string
  city: string
  image: string
  images?: string[]
  bathrooms: number
  
  // Requested fields
  roomNumber: string
  block: string
  type: RoomType
  price: number
  capacity: number
  occupiedBeds: number
  availableBeds: number
  facilities: string[]
  availabilityStatus: AvailabilityStatus
}

export interface Application {
  id: string
  studentId: string
  roomId: string
  status: ApplicationStatus
  appliedAt: string
  
  // Form fields
  studentNumber: string
  fullName: string
  phoneNumber: string
  course: string
  yearOfStudy: string
  gender: string
  additionalInfo?: string
}

export interface Allocation {
  id: string
  applicationId: string
  studentId: string
  roomId: string
  bedNumber: number
  status: AllocationStatus
  startDate: string
  endDate: string
}

export interface PaymentRecord {
  id: string
  allocationId: string
  studentId: string
  amount: number
  status: PaymentStatus
  paymentDate: string
  referenceNumber: string
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  isRead: boolean
  createdAt: string
}
